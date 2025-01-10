import React from 'react';
import './HomePage.css'; 

const HomePage = () => {
    return (
        <div className="homepage">
            <header className="homepage-header">
                <h1>Eco Cerrillos</h1>
                <p>Encuentra tu departamento ideal</p>
            </header>
            <section className="properties">
                {/* Aquí irán los datos dinámicos */}
                <div className="property-card">
                    <h2>Departamento 1</h2>
                    <p>Descripción breve</p>
                </div>
                <div className="property-card">
                    <h2>Departamento 2</h2>
                    <p>Descripción breve</p>
                </div>
            </section>
            <div className="chatbot-icon" onClick={() => alert('Chatbot abierto')}>
                💬
            </div>
        </div>
    );
};

export default HomePage;
