// Cloudflare Worker script
const html = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Data Center Infrastructure Cost Calculator</title>
    <style>
        body {
            font-family: Arial, sans-serif;
            max-width: 800px;
            margin: 0 auto;
            padding: 20px;
            background-color: #f5f5f5;
        }
        .calculator {
            background-color: white;
            padding: 20px;
            border-radius: 8px;
            box-shadow: 0 2px 4px rgba(0,0,0,0.1);
        }
        .input-group {
            margin-bottom: 15px;
        }
        label {
            display: block;
            margin-bottom: 5px;
            font-weight: bold;
        }
        input[type="number"] {
            width: 100%;
            padding: 8px;
            border: 1px solid #ddd;
            border-radius: 4px;
        }
        button {
            background-color: #0051c3;
            color: white;
            padding: 10px 20px;
            border: none;
            border-radius: 4px;
            cursor: pointer;
        }
        button:hover {
            background-color: #003d94;
        }
        .results {
            margin-top: 20px;
            padding: 15px;
            background-color: #f8f9fa;
            border-radius: 4px;
        }
    </style>
</head>
<body>
    <div class="calculator">
        <h1>Data Center Infrastructure Cost Calculator</h1>
        
        <div class="input-group">
            <label for="servers">Number of Servers:</label>
            <input type="number" id="servers" min="1" value="1">
        </div>

        <div class="input-group">
            <label for="storage">Storage Capacity (TB):</label>
            <input type="number" id="storage" min="1" value="1">
        </div>

        <div class="input-group">
            <label for="network">Network Bandwidth (Gbps):</label>
            <input type="number" id="network" min="1" value="1">
        </div>

        <div class="input-group">
            <label for="power">Power Capacity (kW):</label>
            <input type="number" id="power" min="1" value="1">
        </div>

        <div class="input-group">
            <label for="duration">Project Duration (Months):</label>
            <input type="number" id="duration" min="1" value="12">
        </div>

        <button onclick="calculateCosts()">Calculate Total Cost</button>

        <div class="results" id="results"></div>
    </div>

    <script>
        function calculateCosts() {
            // Get input values
            const servers = parseFloat(document.getElementById('servers').value) || 0;
            const storage = parseFloat(document.getElementById('storage').value) || 0;
            const network = parseFloat(document.getElementById('network').value) || 0;
            const power = parseFloat(document.getElementById('power').value) || 0;
            const duration = parseFloat(document.getElementById('duration').value) || 0;

            // Cost assumptions (per month)
            const serverCost = 500; // Cost per server
            const storageCost = 100; // Cost per TB
            const networkCost = 200; // Cost per Gbps
            const powerCost = 150; // Cost per kW

            // Calculate costs
            const monthlyCosts = {
                servers: servers * serverCost,
                storage: storage * storageCost,
                network: network * networkCost,
                power: power * powerCost
            };

            const totalMonthlyCost = Object.values(monthlyCosts).reduce((a, b) => a + b, 0);
            const totalProjectCost = totalMonthlyCost * duration;

            // Display results
            const resultsDiv = document.getElementById('results');
            resultsDiv.innerHTML = `
                <h3>Cost Breakdown</h3>
                <p>Monthly Server Cost: $${monthlyCosts.servers.toLocaleString()}</p>
                <p>Monthly Storage Cost: $${monthlyCosts.storage.toLocaleString()}</p>
                <p>Monthly Network Cost: $${monthlyCosts.network.toLocaleString()}</p>
                <p>Monthly Power Cost: $${monthlyCosts.power.toLocaleString()}</p>
                <h4>Total Monthly Cost: $${totalMonthlyCost.toLocaleString()}</h4>
                <h4>Total Project Cost (${duration} months): $${totalProjectCost.toLocaleString()}</h4>
            `;
        }
    </script>
</body>
</html>`;

addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
    return new Response(html, {
        headers: {
            'content-type': 'text/html;charset=UTF-8',
        },
    });
}
