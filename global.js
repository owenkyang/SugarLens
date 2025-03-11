document.addEventListener('DOMContentLoaded', () => {
    const foodImages = document.querySelectorAll('.image-container img');
    const tooltip = document.createElement('div');
    tooltip.classList.add('nutrition-facts');
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

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
                }
            });

            image.addEventListener('mouseleave', () => {
                if (lastFoodInfo) {
                    updateTooltip(lastFoodInfo);
                }
            });
        });
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
            <h2>${foodInfo.name}</h2>
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
            </div>
        `;
    }
});
