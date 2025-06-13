/**
 * PragmaticPE HVAC Calculator Widget - Optimized for SEO and Traffic Generation
 * Professional duct sizing calculator with lead generation features
 */
(function() {
    'use strict';
    
    class PragmaticPECalculator {
        constructor(containerId, options = {}) {
            this.containerId = containerId;
            this.options = {
                width: options.width || '100%',
                maxWidth: options.maxWidth || '1200px',
                theme: options.theme || 'pragmaticpe',
                showBranding: options.showBranding !== false,
                showLeadCapture: options.showLeadCapture !== false,
                initialVelocity: options.initialVelocity || 2500,
                initialFriction: options.initialFriction || 0.15,
                trackAnalytics: options.trackAnalytics !== false,
                ...options
            };
            
            this.velocityLimit = this.options.initialVelocity;
            this.frictionLimit = this.options.initialFriction;
            this.calculationCount = 0;
            
            this.init();
        }
        
        init() {
            this.createStyles();
            this.createWidget();
            this.calculateResults();
            this.trackEvent('widget_loaded');
        }
        
        createStyles() {
            if (document.getElementById('pragmaticpe-calculator-styles')) return;
            
            const styles = `
                .pragmaticpe-calculator {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif;
                    width: ${this.options.width};
                    max-width: ${this.options.maxWidth};
                    margin: 0 auto;
                    padding: 0;
                    background: #ffffff;
                    border-radius: 16px;
                    box-shadow: 0 8px 32px rgba(0, 0, 0, 0.08);
                    overflow: hidden;
                    position: relative;
                }
                
                .pragmaticpe-calculator * {
                    box-sizing: border-box;
                }
                
                .pragmaticpe-header {
                    background: linear-gradient(135deg, #1e40af 0%, #3b82f6 50%, #60a5fa 100%);
                    color: white;
                    padding: 32px 24px;
                    text-align: center;
                    position: relative;
                }
                
                .pragmaticpe-header::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: url('data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs><rect width="100" height="100" fill="url(%23grid)"/></svg>');
                    opacity: 0.3;
                }
                
                .pragmaticpe-title {
                    font-size: 32px;
                    font-weight: 700;
                    margin: 0 0 8px 0;
                    position: relative;
                    z-index: 1;
                }
                
                .pragmaticpe-subtitle {
                    font-size: 18px;
                    opacity: 0.95;
                    margin: 0 0 16px 0;
                    position: relative;
                    z-index: 1;
                }
                
                .pragmaticpe-badge {
                    display: inline-block;
                    background: rgba(255, 255, 255, 0.2);
                    color: white;
                    padding: 8px 16px;
                    border-radius: 20px;
                    font-size: 14px;
                    font-weight: 600;
                    position: relative;
                    z-index: 1;
                }
                
                .pragmaticpe-content {
                    padding: 32px 24px;
                }
                
                .pragmaticpe-inputs {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
                    gap: 24px;
                    margin-bottom: 32px;
                    padding: 24px;
                    background: linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%);
                    border-radius: 12px;
                    border: 1px solid #e2e8f0;
                }
                
                .pragmaticpe-input-group {
                    position: relative;
                }
                
                .pragmaticpe-label {
                    display: block;
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #1e293b;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .pragmaticpe-input {
                    width: 100%;
                    padding: 16px 20px;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    font-size: 18px;
                    font-weight: 600;
                    text-align: center;
                    transition: all 0.3s ease;
                    background: white;
                    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.04);
                }
                
                .pragmaticpe-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                    box-shadow: 0 0 0 3px rgba(59, 130, 246, 0.1);
                    transform: translateY(-1px);
                }
                
                .pragmaticpe-input-hint {
                    font-size: 12px;
                    color: #64748b;
                    margin-top: 4px;
                    text-align: center;
                }
                
                .pragmaticpe-results {
                    margin: 32px 0;
                }
                
                .pragmaticpe-section-title {
                    font-size: 24px;
                    font-weight: 700;
                    margin: 0 0 20px 0;
                    color: #1e293b;
                    display: flex;
                    align-items: center;
                    gap: 12px;
                }
                
                .pragmaticpe-section-title::before {
                    content: '📊';
                    font-size: 28px;
                }
                
                .pragmaticpe-stats {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
                    gap: 16px;
                    margin-bottom: 24px;
                }
                
                .pragmaticpe-stat {
                    background: white;
                    border: 2px solid #e2e8f0;
                    border-radius: 12px;
                    padding: 20px;
                    text-align: center;
                    transition: transform 0.2s ease;
                }
                
                .pragmaticpe-stat:hover {
                    transform: translateY(-2px);
                }
                
                .pragmaticpe-stat-value {
                    font-size: 28px;
                    font-weight: 700;
                    color: #3b82f6;
                    margin-bottom: 4px;
                }
                
                .pragmaticpe-stat-label {
                    font-size: 14px;
                    color: #64748b;
                    font-weight: 600;
                }
                
                .pragmaticpe-table {
                    width: 100%;
                    border-collapse: collapse;
                    background: white;
                    border-radius: 12px;
                    overflow: hidden;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    margin: 24px 0;
                }
                
                .pragmaticpe-table th {
                    background: #3b82f6;
                    color: white;
                    padding: 16px 12px;
                    text-align: center;
                    font-weight: 600;
                    font-size: 14px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .pragmaticpe-table td {
                    padding: 14px 12px;
                    text-align: center;
                    border-bottom: 1px solid #f1f5f9;
                    font-weight: 500;
                }
                
                .pragmaticpe-table tr:nth-child(even) {
                    background: #f8fafc;
                }
                
                .pragmaticpe-table tr:hover {
                    background: #e0f2fe;
                }
                
                .pragmaticpe-actions {
                    display: flex;
                    gap: 16px;
                    justify-content: center;
                    flex-wrap: wrap;
                    margin: 32px 0;
                }
                
                .pragmaticpe-btn {
                    padding: 16px 32px;
                    border: none;
                    border-radius: 12px;
                    font-size: 16px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: all 0.3s ease;
                    text-decoration: none;
                    display: inline-flex;
                    align-items: center;
                    gap: 8px;
                    text-transform: uppercase;
                    letter-spacing: 0.5px;
                }
                
                .pragmaticpe-btn-primary {
                    background: linear-gradient(135deg, #10b981, #059669);
                    color: white;
                    box-shadow: 0 4px 12px rgba(16, 185, 129, 0.3);
                }
                
                .pragmaticpe-btn-primary:hover {
                    transform: translateY(-2px);
                    box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
                }
                
                .pragmaticpe-btn-secondary {
                    background: white;
                    color: #3b82f6;
                    border: 2px solid #3b82f6;
                }
                
                .pragmaticpe-btn-secondary:hover {
                    background: #3b82f6;
                    color: white;
                    transform: translateY(-2px);
                }
                
                .pragmaticpe-lead-capture {
                    background: linear-gradient(135deg, #f59e0b, #d97706);
                    color: white;
                    padding: 32px 24px;
                    border-radius: 12px;
                    text-align: center;
                    margin: 32px 0;
                    position: relative;
                    overflow: hidden;
                }
                
                .pragmaticpe-lead-capture::before {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    right: 0;
                    bottom: 0;
                    background: linear-gradient(45deg, transparent 30%, rgba(255,255,255,0.1) 50%, transparent 70%);
                    animation: shine 3s infinite;
                }
                
                @keyframes shine {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                
                .pragmaticpe-lead-title {
                    font-size: 24px;
                    font-weight: 700;
                    margin-bottom: 12px;
                    position: relative;
                    z-index: 1;
                }
                
                .pragmaticpe-lead-text {
                    font-size: 16px;
                    opacity: 0.95;
                    margin-bottom: 20px;
                    position: relative;
                    z-index: 1;
                }
                
                .pragmaticpe-branding {
                    text-align: center;
                    padding: 24px;
                    background: #f8fafc;
                    border-top: 1px solid #e2e8f0;
                    color: #64748b;
                    font-size: 14px;
                }
                
                .pragmaticpe-logo {
                    font-weight: 700;
                    color: #3b82f6;
                    text-decoration: none;
                }
                
                @media (max-width: 768px) {
                    .pragmaticpe-calculator {
                        margin: 10px;
                        border-radius: 12px;
                    }
                    
                    .pragmaticpe-content {
                        padding: 20px 16px;
                    }
                    
                    .pragmaticpe-inputs {
                        grid-template-columns: 1fr;
                        gap: 16px;
                        padding: 20px;
                    }
                    
                    .pragmaticpe-title {
                        font-size: 24px;
                    }
                    
                    .pragmaticpe-actions {
                        flex-direction: column;
                    }
                    
                    .pragmaticpe-btn {
                        width: 100%;
                        justify-content: center;
                    }
                    
                    .pragmaticpe-table {
                        font-size: 14px;
                    }
                    
                    .pragmaticpe-table th,
                    .pragmaticpe-table td {
                        padding: 8px 6px;
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = 'pragmaticpe-calculator-styles';
            styleSheet.textContent = styles;
            document.head.appendChild(styleSheet);
        }
        
        calculateCFMFromVelocity(velocity, diameter) {
            const radiusFeet = (diameter / 12) / 2;
            const areaSquareFeet = Math.PI * Math.pow(radiusFeet, 2);
            return areaSquareFeet * velocity;
        }
        
        calculateCFMFromFriction(friction, diameter) {
            const power = 1 / 1.9;
            const numerator = friction * Math.pow(diameter, 5.02);
            const cfm = Math.pow(numerator / 0.109136, power);
            return Math.max(0, cfm);
        }
        
        calculateResults() {
            const ductDiameters = [];
            for (let diameter = 4; diameter <= 60; diameter += 2) {
                ductDiameters.push(diameter);
            }
            
            this.results = ductDiameters.map(diameter => {
                const velocityCFM = this.calculateCFMFromVelocity(this.velocityLimit, diameter);
                const frictionCFM = this.calculateCFMFromFriction(this.frictionLimit, diameter);
                
                return {
                    diameter,
                    velocityCFM: Math.round(Math.max(0, velocityCFM)),
                    frictionCFM: Math.round(Math.max(0, frictionCFM)),
                    difference: Math.round(Math.abs(velocityCFM - frictionCFM))
                };
            });
            
            this.updateDisplay();
            this.calculationCount++;
            
            if (this.calculationCount > 0) {
                this.trackEvent('calculation_performed', {
                    velocity: this.velocityLimit,
                    friction: this.frictionLimit,
                    calculation_number: this.calculationCount
                });
            }
        }
        
        updateDisplay() {
            this.updateStats();
            this.updateTable();
        }
        
        updateStats() {
            const statsContainer = document.querySelector(`#${this.containerId} .pragmaticpe-stats`);
            if (!statsContainer) return;
            
            const maxVelocityCFM = Math.max(...this.results.map(r => r.velocityCFM));
            const maxFrictionCFM = Math.max(...this.results.map(r => r.frictionCFM));
            const optimalDiameter = this.findOptimalDiameter();
            
            statsContainer.innerHTML = `
                <div class="pragmaticpe-stat">
                    <div class="pragmaticpe-stat-value">${maxVelocityCFM.toLocaleString()}</div>
                    <div class="pragmaticpe-stat-label">Max Velocity CFM</div>
                </div>
                <div class="pragmaticpe-stat">
                    <div class="pragmaticpe-stat-value">${maxFrictionCFM.toLocaleString()}</div>
                    <div class="pragmaticpe-stat-label">Max Friction CFM</div>
                </div>
                <div class="pragmaticpe-stat">
                    <div class="pragmaticpe-stat-value">${optimalDiameter}"</div>
                    <div class="pragmaticpe-stat-label">Optimal Diameter</div>
                </div>
            `;
        }
        
        findOptimalDiameter() {
            let minDifference = Infinity;
            let optimalDiameter = 4;
            
            this.results.forEach(result => {
                if (result.difference < minDifference) {
                    minDifference = result.difference;
                    optimalDiameter = result.diameter;
                }
            });
            
            return optimalDiameter;
        }
        
        updateTable() {
            const tbody = document.querySelector(`#${this.containerId} .pragmaticpe-table tbody`);
            if (!tbody) return;
            
            tbody.innerHTML = this.results.slice(0, 15).map(result => `
                <tr>
                    <td>${result.diameter}"</td>
                    <td>${result.velocityCFM.toLocaleString()}</td>
                    <td>${result.frictionCFM.toLocaleString()}</td>
                    <td>${result.difference.toLocaleString()}</td>
                </tr>
            `).join('');
        }
        
        exportToPDF() {
            if (typeof window.jspdf === 'undefined') {
                this.trackEvent('pdf_export_failed', { reason: 'jspdf_not_loaded' });
                alert('PDF export feature requires additional library. Please contact PragmaticPE for the full version.');
                return;
            }
            
            this.trackEvent('pdf_export_started');
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Enhanced PDF with PragmaticPE branding
            doc.setFillColor(59, 130, 246);
            doc.rect(0, 0, doc.internal.pageSize.width, 30, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(20);
            doc.setFont('helvetica', 'bold');
            doc.text('PragmaticPE HVAC Calculator Report', doc.internal.pageSize.width / 2, 20, { align: 'center' });
            
            // Professional details
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.setFont('helvetica', 'normal');
            doc.text('Professional HVAC Duct CFM Analysis', 20, 45);
            doc.text(`Velocity Limit: ${this.velocityLimit} FPM`, 20, 55);
            doc.text(`Friction Limit: ${this.frictionLimit} in w.g./100 ft`, 20, 65);
            doc.text(`Generated: ${new Date().toLocaleDateString()} | PragmaticPE.com`, 20, 75);
            
            // Optimal recommendation
            const optimal = this.findOptimalDiameter();
            doc.setFont('helvetica', 'bold');
            doc.text(`Recommended Diameter: ${optimal}" (Optimal CFM balance)`, 20, 90);
            
            // Table
            const tableData = this.results.slice(0, 20).map(result => [
                `${result.diameter}"`,
                result.velocityCFM.toLocaleString(),
                result.frictionCFM.toLocaleString(),
                result.difference.toLocaleString()
            ]);
            
            if (doc.autoTable) {
                doc.autoTable({
                    head: [['Diameter', 'Velocity CFM', 'Friction CFM', 'Difference']],
                    body: tableData,
                    startY: 100,
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [59, 130, 246] },
                    margin: { left: 20, right: 20 }
                });
            }
            
            // Footer
            const pageHeight = doc.internal.pageSize.height;
            doc.setFontSize(10);
            doc.setTextColor(100, 100, 100);
            doc.text('This report was generated by PragmaticPE Professional HVAC Calculator', 20, pageHeight - 20);
            doc.text('Visit PragmaticPE.com for more engineering tools and consultations', 20, pageHeight - 10);
            
            doc.save(`PragmaticPE_HVAC_Calculator_${new Date().toISOString().split('T')[0]}.pdf`);
            
            this.trackEvent('pdf_export_completed');
        }
        
        trackEvent(eventName, data = {}) {
            if (!this.options.trackAnalytics) return;
            
            // Google Analytics 4
            if (typeof gtag !== 'undefined') {
                gtag('event', eventName, {
                    event_category: 'HVAC_Calculator',
                    event_label: 'PragmaticPE_Widget',
                    ...data
                });
            }
            
            // Facebook Pixel
            if (typeof fbq !== 'undefined') {
                fbq('trackCustom', `HVACCalculator_${eventName}`, data);
            }
            
            // Custom analytics callback
            if (this.options.onEvent && typeof this.options.onEvent === 'function') {
                this.options.onEvent(eventName, data);
            }
            
            console.log(`PragmaticPE Calculator Event: ${eventName}`, data);
        }
        
        createWidget() {
            const container = document.getElementById(this.containerId);
            if (!container) {
                console.error(`Container with ID "${this.containerId}" not found`);
                return;
            }
            
            container.innerHTML = `
                <div class="pragmaticpe-calculator">
                    <div class="pragmaticpe-header">
                        <h1 class="pragmaticpe-title">HVAC Duct CFM Calculator</h1>
                        <p class="pragmaticpe-subtitle">Professional Engineering Calculations</p>
                        <div class="pragmaticpe-badge">PragmaticPE Professional Tool</div>
                    </div>
                    
                    <div class="pragmaticpe-content">
                        <div class="pragmaticpe-inputs">
                            <div class="pragmaticpe-input-group">
                                <label class="pragmaticpe-label">Velocity Limit (FPM)</label>
                                <input 
                                    type="number" 
                                    class="pragmaticpe-input velocity-input"
                                    value="${this.velocityLimit}"
                                    min="100" 
                                    max="5000" 
                                    step="50"
                                >
                                <div class="pragmaticpe-input-hint">Recommended: 500-3000 FPM</div>
                            </div>
                            <div class="pragmaticpe-input-group">
                                <label class="pragmaticpe-label">Friction Limit (in w.g./100 ft)</label>
                                <input 
                                    type="number" 
                                    class="pragmaticpe-input friction-input"
                                    value="${this.frictionLimit}"
                                    min="0.01" 
                                    max="1.0" 
                                    step="0.01"
                                >
                                <div class="pragmaticpe-input-hint">Recommended: 0.08-0.15 in w.g./100 ft</div>
                            </div>
                        </div>
                        
                        <div class="pragmaticpe-results">
                            <h3 class="pragmaticpe-section-title">Analysis Results</h3>
                            
                            <div class="pragmaticpe-stats">
                                <!-- Stats will be populated here -->
                            </div>
                            
                            <div class="pragmaticpe-actions">
                                <button class="pragmaticpe-btn pragmaticpe-btn-primary" onclick="window.pragmaticpeCalc_${this.containerId}.exportToPDF()">
                                    📄 Export Professional Report
                                </button>
                                <a href="https://pragmaticpe.com/contact" class="pragmaticpe-btn pragmaticpe-btn-secondary" target="_blank">
                                    💼 Get Professional Design
                                </a>
                            </div>
                            
                            <table class="pragmaticpe-table">
                                <thead>
                                    <tr>
                                        <th>Diameter</th>
                                        <th>Velocity CFM</th>
                                        <th>Friction CFM</th>
                                        <th>Difference</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <!-- Results will be populated here -->
                                </tbody>
                            </table>
                        </div>
                        
                        ${this.options.showLeadCapture ? `
                            <div class="pragmaticpe-lead-capture">
                                <h3 class="pragmaticpe-lead-title">Need Professional HVAC Design?</h3>
                                <p class="pragmaticpe-lead-text">Get expert engineering consultation for your project. Our team provides complete HVAC system design, analysis, and optimization.</p>
                                <a href="https://pragmaticpe.com/hvac-consultation" class="pragmaticpe-btn pragmaticpe-btn-primary" target="_blank">
                                    🎯 Schedule Consultation
                                </a>
                            </div>
                        ` : ''}
                    </div>
                    
                    ${this.options.showBranding ? `
                        <div class="pragmaticpe-branding">
                            Powered by <a href="https://pragmaticpe.com" class="pragmaticpe-logo" target="_blank">PragmaticPE</a> - Professional Engineering Solutions
                        </div>
                    ` : ''}
                </div>
            `;
            
            // Store global reference for PDF export
            window[`pragmaticpeCalc_${this.containerId}`] = this;
            
            // Add event listeners
            const velocityInput = container.querySelector('.velocity-input');
            const frictionInput = container.querySelector('.friction-input');
            
            velocityInput.addEventListener('input', (e) => {
                this.velocityLimit = Number(e.target.value);
                this.calculateResults();
            });
            
            frictionInput.addEventListener('input', (e) => {
                this.frictionLimit = Number(e.target.value);
                this.calculateResults();
            });
            
            // Track input interactions
            velocityInput.addEventListener('change', () => {
                this.trackEvent('velocity_changed', { value: this.velocityLimit });
            });
            
            frictionInput.addEventListener('change', () => {
                this.trackEvent('friction_changed', { value: this.frictionLimit });
            });
        }
    }
    
    // Make it globally available
    window.PragmaticPECalculator = PragmaticPECalculator;
    
    // Auto-initialize with data attributes
    document.addEventListener('DOMContentLoaded', function() {
        const autoContainers = document.querySelectorAll('[data-pragmaticpe-calculator]');
        autoContainers.forEach(container => {
            const options = {};
            
            // Parse data attributes
            Object.keys(container.dataset).forEach(key => {
                if (key.startsWith('calc')) {
                    const optionKey = key.replace('calc', '').toLowerCase();
                    let value = container.dataset[key];
                    
                    // Convert string values to appropriate types
                    if (value === 'true') value = true;
                    else if (value === 'false') value = false;
                    else if (!isNaN(value) && value !== '') value = Number(value);
                    
                    options[optionKey] = value;
                }
            });
            
            new PragmaticPECalculator(container.id, options);
        });
    });
})();