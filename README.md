# BioSort AI: Intelligent Biomedical Waste Classification

BioSort AI is an end-to-end automated system designed to revolutionize biomedical waste (BMW) management in healthcare facilities. By combining computer vision, machine learning, and mechanical automation, the project aims to eliminate the high rate of human error (estimated at 35-40%) in manual waste segregation.

## 🎯 Project Intent
The primary goal is to ensure biosafety and regulatory compliance by automatically classifying medical waste into four prescribed categories:
1.  **Yellow:** Infectious waste, bandages, and chemical waste.
2.  **Red:** Contaminated plastic waste (tubing, bottles).
3.  **Blue:** Glassware and metallic body implants.
4.  **White:** Waste sharps (needles, syringes, scalpels).

## 💡 How It Works
The system follows a synchronized hardware-software workflow:
- **Detection:** An IR sensor triggers the system when a waste item enters the input chamber.
- **Vision:** A high-definition camera captures the item, which is then processed by a Convolutional Neural Network (CNN) model.
- **Inference:** The AI calculates a confidence score and predicts the waste category in real-time.
- **Action:** A servo-based mechanical chute rotates to physically direct the waste into the correct bin.

## 🚀 Key Features
- **Active Sensor Stream:** Real-time visual monitoring via a "Cyber-Blue" futuristic dashboard.
- **Edge Deployment:** Optimized for low-latency inference on a Raspberry Pi 4 using TensorFlow Lite.
- **High Accuracy:** Target classification accuracy of >90% to prevent cross-contamination and needle-stick injuries.
- **Modern UI:** A React 19-based interface providing live system status, confidence bars, and AI diagnosis logs.

## 🛠 Technical Implementation
- **Frontend:** React, TypeScript, Tailwind CSS, Lucide Icons.
- **ML Engine:** TensorFlow / Keras (CNN Architectures like MobileNet/EfficientNet).
- **Hardware Interface:** Python-based control for Raspberry Pi GPIO, Servo Motors, and Pi Camera Module.
- **Environment:** Designed for high-impact academic demonstration and eventual real-world hospital integration.