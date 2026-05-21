import { useState } from 'react';

function App() {
  const [formData, setFormData] = useState({
    gender: 1, 
    age: 30,
    hypertension: 0,
    heart_disease: 0,
    ever_married: 1,
    work_type: 0, 
    Residence_type: 1, 
    avg_glucose_level: 105.0,
    bmi: 28.0,
    smoking_status: 0, 
  });

  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: Number(value), 
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setResult(null);

    try {
      const response = await fetch('https://model-ai-s-production.up.railway.app/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error("Error connecting to API:", error);
      alert("تعذر الاتصال بالـ API، تأكد أن سيرفر FastAPI شغال في الـ Terminal الثانية!");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ maxWidth: '600px', margin: '30px auto', padding: '20px', fontFamily: 'system-ui, sans-serif', direction: 'ltr' }}>
      <h2 style={{ textAlign: 'center' }}>🧠 Stroke Risk Intelligence System</h2>
      <p style={{ textAlign: 'center', color: '#666' }}>Fill in patient details to get AI-based risk assessment.</p>
      
      <form onSubmit={handleSubmit} style={{ display: 'grid', gap: '15px', marginTop: '20px' }}>
        
        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Gender:</label>
          <select name="gender" value={formData.gender} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Male</option>
            <option value={0}>Female</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Age:</label>
          <input type="number" name="age" value={formData.age} onChange={handleChange} min="1" max="120" style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Ever Married?:</label>
          <select name="ever_married" value={formData.ever_married} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Residence Type:</label>
          <select name="Residence_type" value={formData.Residence_type} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Urban</option>
            <option value={0}>Rural</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Hypertension:</label>
          <select name="hypertension" value={formData.hypertension} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Heart Disease:</label>
          <select name="heart_disease" value={formData.heart_disease} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={1}>Yes</option>
            <option value={0}>No</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Average Glucose Level:</label>
          <input type="number" step="0.01" name="avg_glucose_level" value={formData.avg_glucose_level} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>BMI:</label>
          <input type="number" step="0.1" name="bmi" value={formData.bmi} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }} />
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Work Type:</label>
          <select name="work_type" value={formData.work_type} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={0}>Private</option>
            <option value={1}>Self-employed</option>
            <option value={2}>Govt job</option>
            <option value={3}>Children</option>
            <option value={4}>Never worked</option>
          </select>
        </div>

        <div>
          <label style={{ display: 'block', marginBottom: '5px', fontWeight: 'bold' }}>Smoking Status:</label>
          <select name="smoking_status" value={formData.smoking_status} onChange={handleChange} style={{ width: '100%', padding: '10px', borderRadius: '4px', border: '1px solid #ccc' }}>
            <option value={0}>Never smoked</option>
            <option value={1}>Formerly smoked</option>
            <option value={2}>Smokes</option>
            <option value={3}>Unknown</option>
          </select>
        </div>

        <button type="submit" disabled={loading} style={{ padding: '12px', background: '#007bff', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>
          {loading ? "Analyzing..." : "Run Diagnostic Analysis"}
        </button>
      </form>

      {result && (
        <div style={{ marginTop: '25px', padding: '15px', borderRadius: '6px', border: '1px solid', borderColor: result.stroke_risk ? '#ffeeba' : '#c3e6cb', background: result.stroke_risk ? '#fff3cd' : '#d4edda', color: result.stroke_risk ? '#856404' : '#155724' }}>
          <h3 style={{ margin: '0 0 10px 0' }}>Result: {result.stroke_risk ? "⚠️ Stroke Risk Detected" : "✅ No Stroke Risk"}</h3>
          <p style={{ margin: '0 0 5px 0' }}><strong>Risk Probability:</strong> {(result.probability * 100).toFixed(2)}%</p>
          {result.stroke_risk && (
            <p style={{ margin: '5px 0 0 0', fontWeight: 'bold', color: '#dc3545' }}>Immediate medical consultation is highly recommended.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default App;