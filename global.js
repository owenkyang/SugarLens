// TODO: show two exampels of what a good glucose spike is and what a bad glucose spike it
// TODO: make the webpage more modular looking. Have different colors for the different sections
document.addEventListener('DOMContentLoaded', () => {
    // Add back button handlers near the top
    const backButtons = document.querySelectorAll('.back-button');
    backButtons.forEach(button => {
        button.addEventListener('click', () => {
            const currentSection = button.parentElement;
            if (currentSection.id === 'intermediate-section') {
                // Clean up graphs before transitioning back
                const salmonGraph = document.getElementById('salmon-graph');
                const cerealGraph = document.getElementById('cereal-graph');
                if (salmonGraph) salmonGraph.innerHTML = '';
                if (cerealGraph) cerealGraph.innerHTML = '';
                transitionToNext(intermediateSection, introSection);
            } else if (currentSection.id === 'main-content') {
                // Clean up UI elements before transitioning back
                tooltip.style.display = 'none';
                tooltip.style.opacity = '0';
                foodTitle.style.display = 'none';
                foodTitle.style.opacity = '0';
                
                // Reset buttons container
                buttonsContainer.style.opacity = '0';
                buttonsContainer.style.display = 'none';
                
                // Reset score and buttons
                const scoreDisplay = document.getElementById('score-display');
                if (scoreDisplay) {
                    scoreDisplay.style.opacity = '0';
                    scoreDisplay.style.display = 'none';
                }
                
                // Reset selection state
                selectedFoods = [];
                foodImages.forEach(img => {
                    img.classList.remove('selected');
                    img.style.removeProperty('box-shadow');
                });
                
                transitionToNext(mainContent, intermediateSection);
            }
        });
    });

    // Intro screen functionality
    const introSection = document.getElementById('intro-section');
    const intermediateSection = document.getElementById('intermediate-section');
    const mainContent = document.getElementById('main-content');
    const letsBegin = document.getElementById('lets-begin');
    const letsPlay = document.getElementById('lets-play');
    const beginArrow = document.getElementById('lets-begin-arrow');
    const playArrow = document.getElementById('lets-play-arrow');

    // Common transition function
    const transitionToNext = (fromSection, toSection) => {
        fromSection.style.transition = 'opacity 1s ease-out';
        fromSection.style.opacity = '0';
        
        toSection.style.display = 'block';
        setTimeout(() => {
            toSection.style.transition = 'opacity 1s ease-in';
            toSection.style.opacity = '1';
        }, 100);

        setTimeout(() => {
            fromSection.style.display = 'none';
        }, 1000);
    };

    // Handler for beginning transition
    const handleBeginTransition = () => {
        transitionToNext(introSection, intermediateSection);
        // Create example graphs after transition
        setTimeout(() => {
            const salmonData = [
                { Date: '2023-01-01T12:00:00', 'Glucose Value': 90 },
                { Date: '2023-01-01T12:15:00', 'Glucose Value': 95 },
                { Date: '2023-01-01T12:30:00', 'Glucose Value': 98 },
                { Date: '2023-01-01T12:45:00', 'Glucose Value': 94 },
                { Date: '2023-01-01T13:00:00', 'Glucose Value': 91 }
            ];

            const cerealData = [
                { Date: '2023-01-01T12:00:00', 'Glucose Value': 90 },
                { Date: '2023-01-01T12:15:00', 'Glucose Value': 120 },
                { Date: '2023-01-01T12:30:00', 'Glucose Value': 145 },
                { Date: '2023-01-01T12:45:00', 'Glucose Value': 130 },
                { Date: '2023-01-01T13:00:00', 'Glucose Value': 105 }
            ];

            createLineGraph(salmonData, 'Salmon', document.getElementById('salmon-graph'), true);
            createLineGraph(cerealData, 'Cereal', document.getElementById('cereal-graph'), false);
        }, 500);
    };

    // Handler for play transition
    const handlePlayTransition = () => {
        // Reset buttons container
        buttonsContainer.style.display = 'block';
        buttonsContainer.style.opacity = '1';
        
        // Show the buttons container at the correct position
        document.body.appendChild(buttonsContainer);
        
        // Reset button states
        const scoreDisplay = document.getElementById('score-display');
        if (scoreDisplay) {
            scoreDisplay.style.display = 'none';
            scoreDisplay.style.opacity = '0';
        }
        refreshButton.style.display = 'none';
        refreshButton.style.opacity = '0';
        learnMoreButton.style.display = 'none';
        learnMoreButton.style.opacity = '0';
        
        transitionToNext(intermediateSection, mainContent);
    };

    // Add click handlers for both text and arrows
    letsBegin.addEventListener('click', handleBeginTransition);
    beginArrow.addEventListener('click', handleBeginTransition);
    letsPlay.addEventListener('click', handlePlayTransition);
    playArrow.addEventListener('click', handlePlayTransition);

    const foodImages = document.querySelectorAll('.image-container img:not(.plate-image)');
    const tooltip = document.createElement('div');
    tooltip.classList.add('nutrition-facts');
    tooltip.style.display = 'none';
    tooltip.style.opacity = '0';
    tooltip.style.transition = 'opacity 0.5s ease-in-out';
    tooltip.style.left = '5%';
    tooltip.style.position = 'absolute';
    document.body.appendChild(tooltip);
  
    const foodTitle = document.createElement('div');
    foodTitle.classList.add('food-title');
    foodTitle.style.display = 'none';
    foodTitle.style.opacity = '0';
    foodTitle.style.left = '5%';
    foodTitle.style.transition = 'opacity 0.5s ease-in-out';
    document.body.appendChild(foodTitle);
  
    const graphsContainer = document.getElementById('graphs-container');
    graphsContainer.style.display = 'none';
    graphsContainer.style.opacity = '0';
    graphsContainer.style.transition = 'opacity 1s ease-in-out';
  
    const graphsTitle = document.getElementById('graphs-title');
    const graphsDescription = document.getElementById('graphs-description');
    const goodFoodsTitle = document.getElementById('good-foods-title');
    const goodFoodsDescription = document.getElementById('good-foods-description');
    const badFoodsTitle = document.getElementById('bad-foods-title');
    const badFoodsDescription = document.getElementById('bad-foods-description');
  
    const buttonsContainer = document.createElement('div');
    buttonsContainer.id = 'buttons-container';
    buttonsContainer.style.position = 'absolute';
    buttonsContainer.style.top = '1100px'; // Adjust position as needed
    buttonsContainer.style.left = '51%';
    buttonsContainer.style.transform = 'translateX(-50%)';
    buttonsContainer.style.zIndex = '1000';
    buttonsContainer.style.width = '100%'; // Ensure it adjusts to the screen width
    buttonsContainer.style.maxWidth = '1200px'; // Limit the maximum width
    buttonsContainer.style.textAlign = 'center'; // Center the buttons
    document.body.appendChild(buttonsContainer);
  
    const learnMoreButton = document.createElement('button');
    learnMoreButton.id = 'learn-more-btn';
    learnMoreButton.textContent = 'Learn Why';
    learnMoreButton.style.display = 'none';
    learnMoreButton.style.margin = '20px auto';
    learnMoreButton.style.fontSize = '24px';
    learnMoreButton.style.padding = '12px 24px';
    learnMoreButton.style.cursor = 'pointer';
    learnMoreButton.style.opacity = '0';
    learnMoreButton.style.transition = 'opacity 0.5s ease-in-out';
    buttonsContainer.appendChild(learnMoreButton);
  
    const refreshButton = document.createElement('button');
    refreshButton.id = 'refresh-btn';
    refreshButton.textContent = 'Refresh';
    refreshButton.style.display = 'none';
    refreshButton.style.margin = '20px auto';
    refreshButton.style.fontSize = '24px';
    refreshButton.style.padding = '12px 24px';
    refreshButton.style.cursor = 'pointer';
    refreshButton.style.opacity = '0';
    refreshButton.style.transition = 'opacity 0.8s ease-in-out';
    buttonsContainer.appendChild(refreshButton);
  
    refreshButton.addEventListener('click', refreshSelections);
  
    let graphsCreated = false;
  
    learnMoreButton.addEventListener('click', () => {
        if (!graphsCreated) {
            graphsCreated = true;
            // Create line graphs for each food
            const goodFoods = ['peanut butter', 'chicken breast', 'avocado', 'spinach'];
            const badFoods = ['blueberry', 'orange juice', '2% milk', 'toast', 'potatoes'];
            const foods = [...goodFoods, ...badFoods];
            d3.csv('data/glucose.csv').then(data => {
                // Show titles and descriptions
                graphsTitle.style.display = 'block';
                graphsDescription.style.display = 'block';
    
                // Append good foods title and description
                const goodFoodsSection = document.createElement('div');
                goodFoodsSection.classList.add('graph-section');
                const goodFoodsTextContainer = document.createElement('div');
                goodFoodsTextContainer.classList.add('text-container');
                const goodFoodsTitleClone = goodFoodsTitle.cloneNode(true);
                const goodFoodsDescriptionClone = goodFoodsDescription.cloneNode(true);
                goodFoodsTextContainer.appendChild(goodFoodsTitleClone);
                goodFoodsTextContainer.appendChild(goodFoodsDescriptionClone);
                goodFoodsSection.appendChild(goodFoodsTextContainer);
                const goodFoodsGraphs = document.createElement('div');
                goodFoodsGraphs.classList.add('graphs-grid');
                goodFoodsSection.appendChild(goodFoodsGraphs);
                graphsContainer.appendChild(goodFoodsSection);
    
                goodFoods.forEach(food => {
                    const foodData = data.filter(d => d.Food.trim().toLowerCase() === food);
                    createLineGraph(foodData, food, goodFoodsGraphs);
                });
    
                // Append bad foods title and description
                const badFoodsSection = document.createElement('div');
                badFoodsSection.classList.add('graph-section');
                const badFoodsTextContainer = document.createElement('div');
                badFoodsTextContainer.classList.add('text-container');
                const badFoodsTitleClone = badFoodsTitle.cloneNode(true);
                const badFoodsDescriptionClone = badFoodsDescription.cloneNode(true);
                badFoodsTextContainer.appendChild(badFoodsTitleClone);
                badFoodsTextContainer.appendChild(badFoodsDescriptionClone);
                badFoodsSection.appendChild(badFoodsTextContainer);
                const badFoodsGraphs = document.createElement('div');
                badFoodsGraphs.classList.add('graphs-grid');
                badFoodsSection.appendChild(badFoodsGraphs);
                graphsContainer.appendChild(badFoodsSection);
    
                badFoods.forEach(food => {
                    const foodData = data.filter(d => d.Food.trim().toLowerCase() === food);
                    if (food === 'potatoes') {
                        const potatoesGraph = document.createElement('div');
                        potatoesGraph.classList.add('potatoes-graph');
                        badFoodsGraphs.appendChild(potatoesGraph);
                        createLineGraph(foodData, food, potatoesGraph);
                    } else {
                        createLineGraph(foodData, food, badFoodsGraphs);
                    }
                });
    
                graphsContainer.style.display = 'block';
                setTimeout(() => {
                    graphsContainer.style.opacity = '1';
                    window.scrollTo({
                        top: graphsContainer.offsetTop,
                        behavior: 'smooth'
                    });
                }, 0);
            });
        } else {
            graphsContainer.style.display = 'block';
            graphsTitle.style.display = 'block'; // Show the title
            setTimeout(() => {
                graphsContainer.style.opacity = '1';
                graphsTitle.style.opacity = '1'; // Fade in the title
                window.scrollTo({
                    top: graphsContainer.offsetTop,
                    behavior: 'smooth'
                });
            }, 0);
    
            // Show titles and descriptions
            goodFoodsTitle.style.display = 'block';
            goodFoodsDescription.style.display = 'block';
            badFoodsTitle.style.display = 'block';
            badFoodsDescription.style.display = 'block';
            graphsDescription.style.display = 'block';
        }
    });
  
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
                    showLearnMoreButton();
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
            }, index * 500);
        });

        // Create or update the score display
        let scoreDisplay = document.getElementById('score-display');
        if (!scoreDisplay) {
            scoreDisplay = document.createElement('div');
            scoreDisplay.id = 'score-display';
        }
        
        // Reset score display styles
        scoreDisplay.style.display = 'block';
        scoreDisplay.style.textAlign = 'center';
        scoreDisplay.style.fontSize = '22px';
        scoreDisplay.style.marginTop = '20px';
        scoreDisplay.style.opacity = '0';
        scoreDisplay.style.transition = 'opacity 0.5s ease-in-out';
        
        // Make sure score display is in buttons container
        if (!buttonsContainer.contains(scoreDisplay)) {
            buttonsContainer.insertBefore(scoreDisplay, buttonsContainer.firstChild);
        }

        setTimeout(() => {
            scoreDisplay.textContent = `Your score is ${score} out of ${maxSelections}`;
            scoreDisplay.style.opacity = '1';
            showRefreshButton();
        }, selectedFoods.length * 500);
    }
  
    function showRefreshButton() {
        const btn = document.getElementById('refresh-btn');
        btn.style.display = 'block';
        learnMoreButton.style.display = 'block'; // Display Learn More button at the same time
        setTimeout(() => {
            btn.style.opacity = '1';
            learnMoreButton.style.opacity = '1'; // Start fading in Learn More button
        }, 0);
    }
  
    function showLearnMoreButton() {
        learnMoreButton.style.display = 'block';
        setTimeout(() => {
            learnMoreButton.style.opacity = '1';
        }, 0);
    }
  
    function refreshSelections() {
        foodImages.forEach(img => {
            img.classList.remove('selected');
            img.style.boxShadow = 'none';
            img.style.transition = 'box-shadow 0.3s ease'; // Reset the transition
            // Remove any inline styles that might interfere with hover
            img.style.removeProperty('box-shadow');
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
        learnMoreButton.style.opacity = '0';
        setTimeout(() => {
            learnMoreButton.style.display = 'none';
        }, 500);
    }
  
    createRefreshButton();
  
    function createLineGraph(data, food, container, isGoodExample = null) {
        const margin = { top: 20, right: 20, bottom: 40, left: 50 },
            width = 300 - margin.left - margin.right,
            height = 250 - margin.top - margin.bottom;

        const svg = d3.select(container)
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
            .call(d3.axisBottom(x).ticks(2).tickFormat(d3.timeFormat("%H:%M"))
                .tickValues([d3.min(data, d => new Date(d.Date)), d3.max(data, d => new Date(d.Date))]));

        // Always use fixed y-axis range (70-170) with 5 ticks
        const y = d3.scaleLinear()
            .domain([70, 170])
            .range([height, 0]);

        svg.append("g")
            .call(d3.axisLeft(y).ticks(5));

        const line = d3.line()
            .x(d => x(new Date(d.Date)))
            .y(d => y(+d['Glucose Value']));

        const path = svg.append("path")
            .datum(data)
            .attr("fill", "none")
            .attr("stroke-width", 3) // Thinner line
            .attr("d", line);

        // Modify line color logic
        if (isGoodExample !== null) {
            path.attr("stroke", isGoodExample ? "green" : "red");
        } else if (goodFoods.includes(food)) {
            path.attr("stroke", "green");
        } else if (badFoods.includes(food)) {
            path.attr("stroke", "red");
        } else {
            path.attr("stroke", "gray");
        }

        svg.append("text")
            .attr("x", width / 2)
            .attr("y", 0) // Adjusted y position to ensure the title is fully visible
            .attr("text-anchor", "middle")
            .attr("class", "graph-title")
            .text(`${food.charAt(0).toUpperCase() + food.slice(1)}`);

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
            .style("font-size", "10px");

        svg.append("text")
            .attr("x", x(d3.max(data, d => new Date(d.Date))))
            .attr("y", height + margin.bottom / 2)
            .attr("dy", "1em")
            .attr("text-anchor", "middle")
            .style("font-size", "10px");

        // Add y-axis label
        svg.append("text")
            .attr("transform", "rotate(-90)")
            .attr("y", 0 - margin.left)
            .attr("x", 0 - (height / 2))
            .attr("dy", "1em")
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Glucose Concentration (mg/dL)");

        // Add x-axis label
        svg.append("text")
            .attr("x", width / 2)
            .attr("y", height + margin.bottom - 10)
            .style("text-anchor", "middle")
            .style("font-size", "12px")
            .text("Timestamp (24 hr)");

        // Add a dedicated tooltip for this graph
        const thisGraphTooltip = d3.select("body").append("div")
            .attr("class", "graph-tooltip")
            .style("opacity", 0);

        const focus = svg.append("g")
            .style("display", "none");

        focus.append("circle")
            .attr("r", 5)
            .attr("fill", isGoodExample !== null ? "black" : "black");

        // Add mouseover interactions
        svg.append("rect")
            .attr("width", width)
            .attr("height", height)
            .style("fill", "none")
            .style("pointer-events", "all")
            .on("mouseover", () => {
                focus.style("display", null);
                thisGraphTooltip.transition()
                    .duration(200)
                    .style("opacity", 0.9);
            })
            .on("mousemove", (event) => {
                const mouse = d3.pointer(event);
                const xDate = x.invert(mouse[0]);
                const closestData = data.reduce((prev, curr) => {
                    return (Math.abs(new Date(curr.Date) - xDate) < Math.abs(new Date(prev.Date) - xDate) ? curr : prev);
                });
                focus.attr("transform", `translate(${x(new Date(closestData.Date))},${y(+closestData['Glucose Value'])})`);
                thisGraphTooltip.html(`Time: ${d3.timeFormat("%H:%M")(new Date(closestData.Date))}<br>Glucose: ${closestData['Glucose Value']}`)
                    .style("left", (event.pageX + 5) + "px")
                    .style("top", (event.pageY - 28) + "px");
            })
            .on("mouseout", () => {
                focus.style("display", "none");
                thisGraphTooltip.transition()
                    .duration(500)
                    .style("opacity", 0);
            });

        // Get total length of the path
        const totalLength = path.node().getTotalLength();

        // Set up initial state of the path animation
        path
            .attr("stroke-dasharray", totalLength + " " + totalLength)
            .attr("stroke-dashoffset", totalLength);

        // Animate the line
        path.transition()
            .duration(2000) // Animation duration in milliseconds
            .ease(d3.easeLinear) // Linear animation
            .attr("stroke-dashoffset", 0); // Animate to fully drawn line
    }
});
