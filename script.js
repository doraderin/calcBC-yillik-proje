const canvas = document.getElementById("graphCanvas");
const ctx = canvas.getContext("2d");

let scale = 1;

function drawGraph() {

    ctx.clearRect(0, 0, canvas.width, canvas.height); 
    drawAxes();

    const expr1 = document.getElementById("expression").value;  
    const expr2 = document.getElementById("expression2").value;  

    const startX = -canvas.width / 2;
    const endX = canvas.width / 2;
    const step = 0.01;

    plotTheGraph(expr1, "violet")
    plotTheGraph(expr2, "#7a80e9")

    function plotTheGraph(expr, lineColor){
        ctx.beginPath();
        for (let xPoint = startX; xPoint <= endX; xPoint += step) {
            const y = evaluateExpression(expr, xPoint); 
            if(y==null) return;
            const screenX = xPoint * scale + canvas.width / 2;
            const screenY = -y * scale + canvas.height / 2;
    
            if (xPoint === startX) {
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