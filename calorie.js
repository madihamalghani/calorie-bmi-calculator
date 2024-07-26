document.getElementById('calculate').addEventListener('click', function() {
    const gender = document.getElementById('gender').value;
    const age = parseInt(document.getElementById('age').value);
    const activityLevel = parseFloat(document.getElementById('activity').value);

    let height;
    const heightUnit = document.querySelector('input[name="height-unit"]:checked').value;
    if (heightUnit === 'cm') {
        height = parseFloat(document.getElementById('height-cm-value').value);
    } else {
        const feet = parseFloat(document.getElementById('height-feet').value);
        const inches = parseFloat(document.getElementById('height-inches').value);
        height = (feet * 30.48) + (inches * 2.54);
    }

    let weight;
    const weightUnit = document.querySelector('input[name="weight-unit"]:checked').value;
    if (weightUnit === 'kg') {
        weight = parseFloat(document.getElementById('weight-kg-value').value);
    } else {
        weight = parseFloat(document.getElementById('weight-pounds-value').value) * 0.453592;
    }

    if (!gender || !age || !height || !weight || !activityLevel) {
        alert('Please fill out all fields.');
        return;
    }

    // Calculate BMR
    let bmr;
    if (gender === 'male') {
        bmr = 10 * weight + 6.25 * height - 5 * age + 5;
    } else {
        bmr = 10 * weight + 6.25 * height - 5 * age - 161;
    }

    // Calculate daily calories
    const dailyCalories = bmr * activityLevel;

    // Calculate BMI
    const heightMeters = height / 100;
    const bmi = weight / (heightMeters * heightMeters);

    // Calculate Lean Body Mass (using the Boer formula)
    let lbm;
    if (gender === 'male') {
        lbm = 0.407 * weight + 0.267 * height - 19.2;
    } else {
        lbm = 0.252 * weight + 0.473 * height - 48.3;
    }

    document.getElementById('calorie-result').textContent = `Your daily calorie needs: ${Math.round(dailyCalories)} calories`;
    document.getElementById('bmi-result').textContent = `Your BMI: ${bmi.toFixed(2)}`;
    document.getElementById('lbm-result').textContent = `Your Lean Body Mass: ${lbm.toFixed(2)} kg`;
});

document.querySelectorAll('input[name="height-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (document.getElementById('cm').checked) {
            document.getElementById('height-cm').style.display = 'block';
            document.getElementById('height-feet-inches').style.display = 'none';
        } else {
            document.getElementById('height-feet-inches').style.display = 'block';
            document.getElementById('height-cm').style.display = 'none';
            // document.getElementById('height-feet-inches').style.display = 'block';
        }
    });
});

document.querySelectorAll('input[name="weight-unit"]').forEach(radio => {
    radio.addEventListener('change', function() {
        if (document.getElementById('kg').checked) {
            document.getElementById('weight-kg').style.display = 'block';
            document.getElementById('weight-pounds').style.display = 'none';
        } else {
            document.getElementById('weight-kg').style.display = 'none';
            document.getElementById('weight-pounds').style.display = 'block';
        }
    });
});
// /////////////////////////////////////////////////////////////////////////////////////
document.addEventListener('DOMContentLoaded', function() {
    // Set default height input based on selected height unit
    const heightUnitRadios = document.querySelectorAll('input[name="height-unit"]');
    const heightCmInput = document.getElementById('height-cm-value');
    const heightFeetInchesInputs = document.getElementById('height-feet-inches');

    heightUnitRadios.forEach(radio => {
        radio.addEventListener('change', function() {
            if (radio.value === 'cm') {
                heightCmInput.parentElement.style.display = 'block';
                heightFeetInchesInputs.style.display = 'none';
            } else {
                heightCmInput.parentElement.style.display = 'none';
                heightFeetInchesInputs.style.display = 'block';
            }
        });
    });

    // Initialize default state
    document.getElementById('cm').checked = true; // Set cm radio as checked
    document.getElementById('height-cm-value').value = '0'; // Set default value for cm input
});
