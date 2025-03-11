document.addEventListener('DOMContentLoaded', () => {
    const foodImages = document.querySelectorAll('.image-container img');
    const tooltip = document.createElement('div');
    tooltip.classList.add('nutrition-facts');
    tooltip.style.display = 'none';
    document.body.appendChild(tooltip);

    const foodTitle = document.createElement('div');
    foodTitle.classList.add('food-title');
    foodTitle.style.display = 'none';
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
                    foodTitle.style.display = 'block';
                    foodTitle.innerHTML = foodName;
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
            </div>
        `;
    }
});

document.addEventListener('DOMContentLoaded', () => {
    const goodFoods = ['peanut butter', 'chicken breast', 'avocado', 'spinach'];
    const badFoods = ['orange juice', 'blueberry', 'toast', '2% milk', 'potatoes'];
    const maxSelections = 4;
    let selectedFoods = [];
    const foodImages = document.querySelectorAll('.peanutbutter-image, .avocado-image, .milk-image, .blueberries-image, .orangejuice-image, .toast-image, .chicken-image, .spinach-image, .potatoes-image');
    foodImages.forEach(img => {
      img.addEventListener('click', () => {
        if (img.classList.contains('selected')) {
          img.classList.remove('selected');
          selectedFoods = selectedFoods.filter(el => el !== img);
        } else {
          if (selectedFoods.length < maxSelections) {
            img.classList.add('selected');
            selectedFoods.push(img);
          } else {
            alert(`You can only select ${maxSelections} foods.`);
          }
        }
      });
    });
    function createSubmitButton() {
      let btn = document.createElement('button');
      btn.id = 'submit-btn';
      btn.textContent = 'Submit';
      const imageContainer = document.querySelector('.image-container');
      if (imageContainer && imageContainer.parentNode) {
        imageContainer.parentNode.insertBefore(btn, imageContainer.nextSibling);
      } else {
        document.body.appendChild(btn);
      }
      btn.addEventListener('click', handleSubmit);
    }
    function handleSubmit() {
      if (selectedFoods.length !== maxSelections) {
        alert(`Please select exactly ${maxSelections} foods.`);
        return;
      }
      selectedFoods.forEach(img => {
        const foodName = img.alt.toLowerCase();
        if (goodFoods.includes(foodName)) {
          img.style.boxShadow = '0 0 10px 5px green';
        } else if (badFoods.includes(foodName)) {
          img.style.boxShadow = '0 0 10px 5px red';
        } else {
          img.style.boxShadow = '0 0 10px 5px gray';
        }
      });
    }
    createSubmitButton();
});
