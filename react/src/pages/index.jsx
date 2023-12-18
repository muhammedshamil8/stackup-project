import { Link, useNavigate } from "react-router-dom";
import React, { useEffect, useState } from 'react';
import BgImage from '../images/task_management_vector.svg'


export default function Index() {
    const navigate = useNavigate(); // Renamed for clarity
    const [isLoading, setLoading] = useState(true);

    // Simulate loading delay (remove this in production)
    useEffect(() => {
        const loadingTimeout = setTimeout(() => {
            setLoading(false); // Set loading to false after the delay
        }, 1500); // Adjust the delay time as needed

        // Cleanup timeout on unmount
        return () => clearTimeout(loadingTimeout);
    }, []);
    const userId = localStorage.getItem('userId');
    if (userId) {
        navigate('/dashboard');
    }
    const styles = {
        index: {
            height: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
        },
        overlay: {
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100%',
            height: '100%',
            backgroundColor: 'rgba(0, 0, 0, 0.7)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: '999',
        },
        loadingSpinner: {
            border: '4px solid rgba(255, 255, 255, 0.3)', /* Light border */
            borderTop: '4px solid #3498db', /* Blue spinner color */
            borderRadius: '50%',
            width: '50px',
            height: '50px',
            animation: 'spin 1s linear infinite', /* Rotation animation */
        },
        '@keyframes spin': {
            '0%': { transform: 'rotate(0deg)' },
            '100%': { transform: 'rotate(360deg)' },
        },
        indexHeader: {
            textAlign: 'center',
        },
        indexCard: {
            backgroundColor: '#fff',
            padding: '20px',
            borderRadius: '8px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
        },
        indexImage: {
            maxWidth: '100%',
            height: 'auto',
            marginBottom: '20px',
        },
        indexBtnChild: {
            textDecoration: 'none',
            margin: '10px'
        },
        indexBtn: {
            padding: '10px 20px',
            margin: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            backgroundColor: '#5b08a7',
            color: '#fff',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer',
        },
        paragragh: {
            display: 'inline',
            fontWeight: 'bold',
            flexWrap: 'auto',
            margin: '10px'
        },
        span: {
            color: 'blue',
        }
    };


    return (
        <div style={styles.index}>
            {isLoading ? (
                <div style={styles.overlay}>
                    <div style={styles.loadingSpinner}></div>
                </div>
            ) : (
                <div style={styles.indexHeader}>
                    <div style={styles.indexCard}>
                        <img src={BgImage} style={styles.indexImage} alt="Zera Logo" />
                        <br />
                        <p style={styles.paragragh}>Effortlessly Organize Your Tasks with <br />  Our Task &nbsp; <span style={styles.span}> Management App</span></p>
                        <br />
                        <Link to="/signup" style={styles.indexBtnChild}>
                            <button style={styles.indexBtn}>
                                Get Started
                            </button>
                        </Link>
                    </div>
                </div>
            )}
        </div>
    );
}