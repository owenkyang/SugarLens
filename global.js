document.addEventListener('DOMContentLoaded', () => {
    const foodImages = document.querySelectorAll('.image-container img');
    const tooltip = document.createElement('div');
    tooltip.classList.add('nutrition-facts');
    tooltip.style.display = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(tooltip);

    const foodTitle = document.createElement('div');
    foodTitle.classList.add('food-title');
    foodTitle.style.display = 'none';
    foodTitle.style.opacity = '0';
    foodTitle.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(foodTitle);

    let lastFoodInfo = null;

    d3.csv('data/macros.csv').then(data => {
        const foodData = processData(data);

        foodImages.forEach(image => {
            image.addEventListener('mouseenter', (event) => {
                const foodName = event.target.alt.replace('-', ' ');
                const foodInfo = foodData[foodName];
                if (foodInfo) {
                    lastFoodInfo = { ...foodInfo, name: foodName };
                    updateTooltip(lastFoodInfo);
                    tooltip.style.display = 'block';
                    setTimeout(() => {
                        tooltip.style.opacity = '1';
                    }, 0);
                    foodTitle.style.display = 'block';
                    foodTitle.innerHTML = foodName;
                    setTimeout(() => {
                        foodTitle.style.opacity = '1';
                    }, 0);
                }
            });

            image.addEventListener('mouseleave', () => {
                if (lastFoodInfo) {
                    updateTooltip(lastFoodInfo);
                }
            });
        });

        // Set the tooltip position once, based on the plate image
    });

    function processData(data) {
        const foodData = {};
        data.forEach(row => {
            const foodName = row.logged_food || row.searched_food;
            if (!foodData[foodName]) {
                foodData[foodName] = {
                    amount: row.amount,
                    unit: row.unit,
                    calorie: row.calorie,
                    total_carb: row.total_carb,
                    sugar: row.sugar,
                    protein: row.protein
                };
            }
        });
        return foodData;
    }

    function updateTooltip(foodInfo) {
        tooltip.innerHTML = `
            <h2>NUTRITION FACTS</h2>
            <hr class="thick-line">
            <div class="nf-row">
                <span class="label-title">Amount</span>
                <span class="label-value">${foodInfo.amount} ${foodInfo.unit}</span>
            </div>
            <hr>
            <div class="nf-row">
                <span class="label-title">Calories</span>
                <span class="label-value">${foodInfo.calorie}</span>
            </div>
            <hr>
            <div class="nf-row">
                <span class="label-title">Total Carbohydrates</span>
                <span class="label-value">${foodInfo.total_carb} g</span>
            </div>
            <div class="nf-sub-row">
                <span class="label-title">Sugar</span>
                <span class="label-value">${foodInfo.sugar} g</span>
            </div>
            <hr>
            <div class="nf-row">
                <span class="label-title">Protein</span>
                <span class="label-value">${foodInfo.protein} g</span>
        `;
    }

    const goodFoods = ['peanut butter', 'chicken breast', 'avocado', 'spinach'];
    const badFoods = ['orange juice', 'blueberry', 'toast', '2% milk', 'potatoes'];
    const maxSelections = 4;
    let selectedFoods = [];

    foodImages.forEach(img => {
        img.addEventListener('click', () => {
            if (selectedFoods.length < maxSelections || img.classList.contains('selected')) {
                if (img.classList.contains('selected')) {
                    img.classList.remove('selected');
                    selectedFoods = selectedFoods.filter(el => el !== img);
                } else {
                    img.classList.add('selected');
                    selectedFoods.push(img);
                }

                if (selectedFoods.length === maxSelections) {
                    handleSubmit();
                    showRefreshButton();
                }
            }
        });
    });

    function handleSubmit() {
        let score = 0;
        selectedFoods.forEach((img, index) => {
            setTimeout(() => {
                const foodName = img.alt.toLowerCase();
                if (goodFoods.includes(foodName)) {
                    img.style.boxShadow = '0 0 10px 5px green';
                    score += 1;
                } else if (badFoods.includes(foodName)) {
                    img.style.boxShadow = '0 0 10px 5px red';
                } else {
                    img.style.boxShadow = '0 0 10px 5px gray';
                }
                img.style.transition = 'box-shadow 0.5s ease-in-out';
            }, index * 500); // Delay each highlight by 500ms
        });

        // Create or update the score display
        let scoreDisplay = document.getElementById('score-display');
        if (!scoreDisplay) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.id = 'score-display';
            scoreDisplay.style.textAlign = 'center';
            scoreDisplay.style.fontSize = '24px';
            scoreDisplay.style.marginTop = '20px';
            scoreDisplay.style.opacity = '0';
            scoreDisplay.style.transition = 'opacity 0.5s ease-in-out';
            document.body.appendChild(scoreDisplay);
        }
        setTimeout(() => {
            scoreDisplay.textContent = `Your score is ${score} out of ${maxSelections}`;
            scoreDisplay.style.opacity = '1';
        }, selectedFoods.length * 500);
    }

    function createRefreshButton() {
        let btn = document.createElement('button');
        btn.id = 'refresh-btn';
        btn.textContent = 'Refresh';
        btn.style.display = 'none';
        btn.style.margin = '20px auto';
        btn.style.fontSize = '24px';
        btn.style.padding = '12px 24px';
        btn.style.cursor = 'pointer';
        btn.style.opacity = '0';
        btn.style.transition = 'opacity 0.5s ease-in-out';
        document.body.appendChild(btn);
        btn.addEventListener('click', refreshSelections);
    }

    function showRefreshButton() {
        const btn = document.getElementById('refresh-btn');
        btn.style.display = 'block';
        setTimeout(() => {
            btn.style.opacity = '1';
        }, 0);
    }

    function refreshSelections() {
        foodImages.forEach(img => {
            img.classList.remove('selected');
            img.style.boxShadow = 'none';
        });
        selectedFoods = [];
        let scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.style.opacity = '0';
            setTimeout(() => {
                scoreDisplay.textContent = '';
            }, 500);
        }
        const btn = document.getElementById('refresh-btn');
        btn.style.opacity = '0';
        setTimeout(() => {
            btn.style.display = 'none';
        }, 500);
    }

    createRefreshButton();

    // Create line graphs for each food
    const foods = ['blueberry', 'avocado', 'toast', '2% milk', 'orange juice', 'chicken breast', 'potatoes', 'spinach', 'peanut butter'];
    d3.csv('data/glucose.csv').then(data => {
        foods.forEach(food => {
            const foodData = data.filter(d => d.Food.trim().toLowerCase() === food);
            createLineGraph(foodData, food);
        });
    });

    function createLineGraph(data, food) {
        const margin = { top: 30, right: 30, bottom: 30, left: 60 },
            width = 460 - margin.left - margin.right,
            height = 400 - margin.top - margin.bottom;

        const svg = d3.select("#graphs-container")
            .append("svg")
            .attr("width", width + margin.left + margin.right)
            .attr("height", height + margin.top + margin.bottom)
            .append("g")
            .attr("transform", `translate(${margin.left},${margin.top})`);

        const x = d3.scaleTime()
            .domain(d3.extent(data, d => new Date(d.Date)))
            .range([0, width]);

        svg.append("g")
            .attr("transform", `translate(0,${height})`)
            .call(d3.axisBottom(x).ticks(2).tickFormat(d3.timeFormat("%H:%M")).tickValues([d3.min(data, d => new Date(d.Date)), d3.max(data, d => new Date(d.Date))]));

        const y = d3.scaleLinear()
            .domain([d3.min(data, d => +d['Glucose Value']), d3.max(data, d => +d['Glucose Value'])])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y).ticks(2).tickValues([d3.min(data, d => +d['Glucose Value']), d3.max(data, d => +d['Glucose Value'])]));

        const line = d3.line()
            .x(d => x(new Date(d.Date)))
            .y(d => y(+d['Glucose Value']));

        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke-width", 3) // Thicker line
            .attr("d", line);

        // Set line color based on food type
        if (goodFoods.includes(food)) {
            path.attr("stroke", "green");
        } else if (badFoods.includes(food)) {
            path.attr("stroke", "red");
        } else {
            path.attr("stroke", "gray");
        }

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", -10)
            .attr("text-anchor", "middle")
            .attr("class", "graph-title")
            .text(`Glucose Levels for ${food.charAt(0).toUpperCase() + food.slice(1)}`);

        // Display the minimum and maximum values on the y-axis
        svg.append("text")
            .attr("x", -margin.left)
            .attr("y", y(d3.min(data, d => +d['Glucose Value'])))
            .attr("dy", "-0.5em")
            .attr("text-anchor", "end")
            .style("font-size", "10px")
            .text(d3.min(data, d => +d['Glucose Value']));

        svg.append("text")
            .attr("x", -margin.left)
            .attr("y", y(d3.max(data, d => +d['Glucose Value'])))
            .attr("dy", "-0.5em")
            .attr("text-anchor", "end")
            .style("font-size", "10px")
            .text(d3.max(data, d => +d['Glucose Value']));

        // Display the earliest and latest times on the x-axis
        svg.append("text")
            .attr("x", x(d3.min(data, d => new Date(d.Date))))
            .attr("y", height + margin.bottom / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .style("font-size", "10px")


        svg.append("text")
            .attr("x", x(d3.max(data, d => new Date(d.Date))))
            .attr("y", height + margin.bottom / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .style("font-size", "10px")

        // Add tooltip
        const graphTooltip = d3.select("body").append("div")
            .attr("class", "graph-tooltip")
            .style("opacity", 0);

        const focus = svg.append("g")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5)
            .attr("fill", "black");

        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", () => {
                focus.style("display", null);
                graphTooltip.transition()
                    .duration(200)
                    .style("opacity", .9);
            })
            .on("mousemove", (event) => {
                const mouse = d3.pointer(event);
                const xDate = x.invert(mouse[0]);
                const closestData = data.reduce((prev, curr) => {
                    return (Math.abs(new Date(curr.Date) - xDate) < Math.abs(new Date(prev.Date) - xDate) ? curr : prev);
                });
                focus.attr("transform", `translate(${x(new Date(closestData.Date))},${y(+closestData['Glucose Value'])})`);
                graphTooltip.html(`Time: ${d3.timeFormat("%H:%M")(new Date(closestData.Date))}<br>Glucose: ${closestData['Glucose Value']}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                focus.style("display", "none");
                graphTooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });
    }
});
