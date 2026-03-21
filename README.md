# 🚨 TrustSentinel: AI-Powered Fraud Detection System

TrustSentinel is a **graph-based financial fraud detection platform** that analyzes transaction data to detect suspicious activities such as **layering, circular transactions, and high-value anomalies**.

Built for hackathons and real-world applications, it provides an **interactive dashboard** for investigators to visualize and analyze fraud patterns in real-time.

---

## 🌐 Live Demo

- 🚀 Frontend: https://trustsentinel.vercel.app  
- ⚙️ Backend API: https://trustsentinel.onrender.com  
- 📘 API Docs (Swagger): https://trustsentinel.onrender.com/docs  

---

## 🔥 Key Features

### 🔗 Transaction Network Graph
- Visualizes money flow between accounts  
- Detects suspicious transaction chains  
- Highlights risky nodes (red = high risk)  

### 🚨 Fraud Detection Algorithms
- **Layering Detection** → rapid multi-hop transfers  
- **Circular Transactions** → money looping back  
- **High Value Anomalies** → unusually large transactions  
- Modular design → easy to extend  

### 📊 Risk Analytics Dashboard
- Risk distribution (High / Medium / Low)  
- Fraud pattern distribution  
- KPI cards (alerts, investigations, transactions)  

### 📋 Fraud Alerts Table
- Grouped alerts per account  
- Multiple fraud patterns per account  
- Risk scoring visualization  

### 📄 Investigation Panel
- Click an account → view:  
  - Fraud reason  
  - Risk level  
  - Transaction path  

### 📤 CSV Upload System
- Upload:
  - `transactions.csv`
  - `customers.csv`
  - `accounts.csv`  
- Instant fraud analysis  

---

## 🏗️ Tech Stack

### Frontend
- **Next.js (React)**  
- **Tailwind CSS**  
- **Recharts**  
- Lucide Icons  

### Backend
- **FastAPI**  
- **Pandas**  
- **NetworkX**  

---

## 📊 Input Dataset Format

### 🔹 transactions.csv
### 🔹 customers.csv
### 🔹 accounts.csv

```csv
transaction_id,from_account,to_account,amount
1,A101,B201,90000
2,B201,C301,85000
3,C301,D401,82000

customer_id,name
C1,John Doe
C2,Jane Smith

account_id,customer_id
A101,C1
B201,C2
```
## 🚀 Deployment

- Frontend → Vercel  
- Backend → Render  

---

## 🔮 Future Enhancements

- 🤖 Machine Learning fraud scoring  
- 📡 Real-time transaction streaming  
- 🔐 User authentication & roles  
- 📄 PDF / Report generation  
- 🌍 Geo-based fraud detection  
- 🧠 AI-based anomaly detection  
- 📊 Advanced graph layouts (force-directed)  
- 🔍 Case management system for investigators  

---
