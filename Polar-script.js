const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;
let endTheta = 2 * Math.PI;

function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawAxes();

    const expr1 = document.getElementById("expression").value;  
    const expr2 = document.getElementById("expression2").value;  

    const startTheta = 0;
    const step = 0.01;

    plotPolarGraph(expr1, "violet")
    plotPolarGraph(expr2, "#7a80e9")

    function plotPolarGraph(expr, lineColor) {
        ctx.beginPath();
        for (let theta = startTheta; theta <= endTheta; theta += step) {
            const r = evaluateExpression(expr, theta);
            if (r == null) return;
            const screenX = r * scale * Math.cos(theta) + canvas.width / 2;
            const screenY = -r * scale * Math.sin(theta) + canvas.height / 2;

            if (theta === startTheta) {
                ctx.moveTo(screenX, screenY);
            } else {
                ctx.lineTo(screenX, screenY);
            }
        }
        ctx.strokeStyle = lineColor;  
        ctx.stroke();
    }
}

function evaluateExpression(expr, x) {
    try {
        return eval(expr,x); 
    } catch (e) {
        alert("Invalid expression");
        return null;
    }
}

function drawAxes() {
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    ctx.lineTo(canvas.width, canvas.height / 2);
    ctx.moveTo(canvas.width / 2, 0);
    ctx.lineTo(canvas.width / 2, canvas.height);
    ctx.strokeStyle = "white";
    ctx.stroke();
}


function zoomIn() {
    scale *= 1.5; 
    drawGraph(); 
}