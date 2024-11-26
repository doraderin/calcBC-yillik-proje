from flask import Flask, render_template, request, send_file
import matplotlib.pyplot as plt
import io

app = Flask(__name__)

@app.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        # Get user input for the function
        equation = request.form["equation"]
        
        # Generate the graph
        x = range(-10, 11)
        try:
            y = [eval(equation.replace("^", "**")) for x in x]
            plt.figure()
            plt.plot(x, y, label=equation)
            plt.xlabel("x")
            plt.ylabel("y")
            plt.title("Graph of " + equation)
            plt.legend()

            # Save the graph to an in-memory buffer
            img = io.BytesIO()
            plt.savefig(img, format="png")
            img.seek(0)
            plt.close()

            return send_file(img, mimetype="image/png")
        except Exception as e:
            return f"Error: {e}"

    return render_template("index.html")
