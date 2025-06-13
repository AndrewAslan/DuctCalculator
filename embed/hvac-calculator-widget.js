(function() {
    'use strict';
    
    // HVAC Calculator Widget
    class HVACCalculatorWidget {
        constructor(containerId, options = {}) {
            this.containerId = containerId;
            this.options = {
                width: options.width || '100%',
                maxWidth: options.maxWidth || '1200px',
                theme: options.theme || 'light',
                showHeader: options.showHeader !== false,
                showChart: options.showChart !== false,
                showTable: options.showTable !== false,
                initialVelocity: options.initialVelocity || 2500,
                initialFriction: options.initialFriction || 0.15,
                ...options
            };
            
            this.velocityLimit = this.options.initialVelocity;
            this.frictionLimit = this.options.initialFriction;
            
            this.init();
        }
        
        init() {
            this.createStyles();
            this.createWidget();
            this.calculateResults();
        }
        
        createStyles() {
            if (document.getElementById('hvac-widget-styles')) return;
            
            const styles = `
                .hvac-widget {
                    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
                    width: ${this.options.width};
                    max-width: ${this.options.maxWidth};
                    margin: 0 auto;
                    padding: 20px;
                    background: #ffffff;
                    border-radius: 12px;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
                    box-sizing: border-box;
                }
                
                .hvac-widget * {
                    box-sizing: border-box;
                }
                
                .hvac-widget-header {
                    text-align: center;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: linear-gradient(135deg, #3b82f6, #1d4ed8);
                    color: white;
                    border-radius: 8px;
                }
                
                .hvac-widget-title {
                    font-size: 28px;
                    font-weight: bold;
                    margin: 0 0 8px 0;
                }
                
                .hvac-widget-subtitle {
                    font-size: 16px;
                    opacity: 0.9;
                    margin: 0;
                }
                
                .hvac-widget-inputs {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 20px;
                    margin-bottom: 30px;
                    padding: 20px;
                    background: #f8fafc;
                    border-radius: 8px;
                }
                
                .hvac-widget-input-group {
                    display: flex;
                    flex-direction: column;
                }
                
                .hvac-widget-label {
                    font-weight: 600;
                    margin-bottom: 8px;
                    color: #374151;
                    font-size: 14px;
                }
                
                .hvac-widget-input {
                    padding: 12px;
                    border: 2px solid #d1d5db;
                    border-radius: 6px;
                    font-size: 16px;
                    text-align: center;
                    transition: border-color 0.2s;
                    background: white;
                }
                
                .hvac-widget-input:focus {
                    outline: none;
                    border-color: #3b82f6;
                }
                
                .hvac-widget-results {
                    margin: 20px 0;
                    padding: 20px;
                    background: #ffffff;
                    border: 1px solid #e5e7eb;
                    border-radius: 8px;
                }
                
                .hvac-widget-table {
                    width: 100%;
                    border-collapse: collapse;
                    margin: 20px 0;
                    font-size: 14px;
                }
                
                .hvac-widget-table th,
                .hvac-widget-table td {
                    padding: 8px 12px;
                    text-align: center;
                    border: 1px solid #e5e7eb;
                }
                
                .hvac-widget-table th {
                    background: #f3f4f6;
                    font-weight: 600;
                    font-size: 13px;
                }
                
                .hvac-widget-table tr:nth-child(even) {
                    background: #f9fafb;
                }
                
                .hvac-widget-export-btn {
                    background: #10b981;
                    color: white;
                    border: none;
                    padding: 12px 24px;
                    border-radius: 6px;
                    font-size: 14px;
                    font-weight: 600;
                    cursor: pointer;
                    transition: background-color 0.2s;
                    margin: 10px 0;
                }
                
                .hvac-widget-export-btn:hover {
                    background: #059669;
                }
                
                .hvac-widget-section-title {
                    font-size: 18px;
                    font-weight: 600;
                    margin: 20px 0 15px 0;
                    color: #374151;
                }
                
                @media (max-width: 768px) {
                    .hvac-widget {
                        padding: 15px;
                        margin: 10px;
                    }
                    
                    .hvac-widget-inputs {
                        grid-template-columns: 1fr;
                        gap: 15px;
                    }
                    
                    .hvac-widget-title {
                        font-size: 24px;
                    }
                    
                    .hvac-widget-table {
                        font-size: 12px;
                    }
                    
                    .hvac-widget-table th,
                    .hvac-widget-table td {
                        padding: 6px 8px;
                    }
                }
            `;
            
            const styleSheet = document.createElement('style');
            styleSheet.id = 'hvac-widget-styles';
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
            
            this.updateTable();
        }
        
        updateTable() {
            const tbody = document.querySelector(`#${this.containerId} .hvac-widget-table tbody`);
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
            // This would require jsPDF to be loaded
            if (typeof window.jspdf === 'undefined') {
                alert('PDF export requires jsPDF library. Please include it in your page.');
                return;
            }
            
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF();
            
            // Header
            doc.setFillColor(59, 130, 246);
            doc.rect(0, 0, doc.internal.pageSize.width, 25, 'F');
            
            doc.setTextColor(255, 255, 255);
            doc.setFontSize(18);
            doc.setFont('helvetica', 'bold');
            doc.text('HVAC Duct CFM Calculator Report', doc.internal.pageSize.width / 2, 16, { align: 'center' });
            
            // Parameters
            doc.setTextColor(0, 0, 0);
            doc.setFontSize(12);
            doc.text(`Velocity Limit: ${this.velocityLimit} FPM`, 20, 40);
            doc.text(`Friction Limit: ${this.frictionLimit} in w.g./100 ft`, 20, 50);
            doc.text(`Generated: ${new Date().toLocaleDateString()}`, 20, 60);
            
            // Table data
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
                    startY: 70,
                    styles: { fontSize: 10 },
                    headStyles: { fillColor: [59, 130, 246] }
                });
            }
            
            doc.save('HVAC_Calculator_Report.pdf');
        }
        
        createWidget() {
            const container = document.getElementById(this.containerId);
            if (!container) {
                console.error(`Container with ID "${this.containerId}" not found`);
                return;
            }
            
            container.innerHTML = `
                <div class="hvac-widget">
                    ${this.options.showHeader ? `
                        <div class="hvac-widget-header">
                            <h1 class="hvac-widget-title">HVAC Duct CFM Calculator</h1>
                            <p class="hvac-widget-subtitle">Professional Engineering Calculations</p>
                        </div>
                    ` : ''}
                    
                    <div class="hvac-widget-inputs">
                        <div class="hvac-widget-input-group">
                            <label class="hvac-widget-label">Velocity Limit (FPM)</label>
                            <input 
                                type="number" 
                                class="hvac-widget-input velocity-input"
                                value="${this.velocityLimit}"
                                min="100" 
                                max="5000" 
                                step="50"
                            >
                        </div>
                        <div class="hvac-widget-input-group">
                            <label class="hvac-widget-label">Friction Limit (in w.g./100 ft)</label>
                            <input 
                                type="number" 
                                class="hvac-widget-input friction-input"
                                value="${this.frictionLimit}"
                                min="0.01" 
                                max="1.0" 
                                step="0.01"
                            >
                        </div>
                    </div>
                    
                    ${this.options.showTable ? `
                        <div class="hvac-widget-results">
                            <h3 class="hvac-widget-section-title">CFM Calculations by Duct Diameter</h3>
                            
                            <button class="hvac-widget-export-btn" onclick="window.hvacWidget_${this.containerId}.exportToPDF()">
                                📄 Export PDF Report
                            </button>
                            
                            <table class="hvac-widget-table">
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
                    ` : ''}
                </div>
            `;
            
            // Store reference for PDF export
            window[`hvacWidget_${this.containerId}`] = this;
            
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
        }
    }
    
    // Make it globally available
    window.HVACCalculatorWidget = HVACCalculatorWidget;
    
    // Auto-initialize if data attributes are found
    document.addEventListener('DOMContentLoaded', function() {
        const autoContainers = document.querySelectorAll('[data-hvac-calculator]');
        autoContainers.forEach(container => {
            const options = {};
            if (container.dataset.velocity) options.initialVelocity = Number(container.dataset.velocity);
            if (container.dataset.friction) options.initialFriction = Number(container.dataset.friction);
            if (container.dataset.width) options.width = container.dataset.width;
            if (container.dataset.maxWidth) options.maxWidth = container.dataset.maxWidth;
            if (container.dataset.showHeader) options.showHeader = container.dataset.showHeader !== 'false';
            if (container.dataset.showTable) options.showTable = container.dataset.showTable !== 'false';
            
            new HVACCalculatorWidget(container.id, options);
        });
    });
})();