from flask import Flask, render_template, request

app = Flask(__name__)

def roman_to_int(numeral):
    values = {
        "M": 1000,
        "D": 500,
        "C": 100,
        "L": 50,
        "X": 10,
        "V": 5,
        "I": 1
    }

    total = 0
    prev_value = 0

    for char in reversed(numeral.upper()):
        current_value = values.get(char, 0)

        if current_value < prev_value:
            total -= current_value
        else:
            total += current_value

        prev_value = current_value

    return total


@app.route("/", methods=["GET", "POST"])
def home():
    result = None
    error = None

    if request.method == "POST":
        numeral = request.form["numeral"]

        if not all(char in "MDCLXVI" for char in numeral.upper()):
            error = "Invalid Roman numeral entered."
        else:
            result = roman_to_int(numeral)

    return render_template("index.html", result=result, error=error)


if __name__ == "__main__":
    app.run(debug=True)
