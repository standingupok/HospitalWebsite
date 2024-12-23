import numpy as np
import joblib
import pandas as pd


def load_model():
    scaling_and_model = joblib.load('model.joblib')
    mean_X_train = scaling_and_model['mean']
    std_X_train = scaling_and_model['std']
    theta_final = scaling_and_model['theta']
    return mean_X_train, std_X_train, theta_final

def standardize_data(X_test, mean_X_train, std_X_train):
    
    for i in range(len(std_X_train)):
        if std_X_train[i] == 0:
            std_X_train[i] = 1.0
    
    X_test_scaled = (X_test - mean_X_train) / std_X_train
    
    return X_test_scaled

def sigmoid(z):
    return 1 / (1 + np.exp(-z))

def predict_result(data, threshold=0.5):
    df = pd.DataFrame(data)

    mean_X_train, std_X_train, theta_final = load_model()
    X_new = df.drop("diagnosis", axis=1)
    X_new = X_new.drop("id", axis=1)

    # Chuẩn hóa dữ liệu mới và dự đoán
    X_new_scaled = standardize_data(X_new, mean_X_train, std_X_train)

    # Thêm theta 0
    X_new_scaled = np.hstack((np.ones((X_new_scaled.shape[0], 1)), X_new_scaled))
    
    z = np.dot(X_new_scaled, theta_final)
    h = sigmoid(z)
    
    y_pred = (h >= threshold).astype(int)
    df["diagnosis"] = y_pred.flatten()
    df["diagnosis"] = df["diagnosis"].map({1: "Malignant", 0: "Benign"})

    
    return df