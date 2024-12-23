from flask import Flask, render_template, request, jsonify
from util import *

def create_app():
    app = Flask(__name__)

    @app.route('/')
    def index():
        return render_template('index.html')
    
    @app.route('/edit')
    def edit():
        return render_template('edit.html')
    
    @app.route('/data')
    def data():
        return render_template('data.html')
    
    @app.route('/predict', methods=['POST'])
    def predict():
        data = request.get_json();
        if not data:
            return jsonify({"error": "No data received"}), 400
            
        res = predict_result(data)
        print("Predict finish")

        res_json = res.to_json(orient="records")
        return res_json

    if __name__ == '__main__':
        app.run(debug=True)

    return app