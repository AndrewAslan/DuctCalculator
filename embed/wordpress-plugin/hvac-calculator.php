<?php
/**
 * Plugin Name: HVAC Calculator Widget
 * Description: Professional HVAC duct CFM calculator with charts and PDF export
 * Version: 1.0
 * Author: Your Name
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

class HVACCalculatorPlugin {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_shortcode('hvac_calculator', array($this, 'render_shortcode'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
    }
    
    public function init() {
        // Plugin initialization
    }
    
    public function enqueue_scripts() {
        // Only load on pages that use the shortcode
        global $post;
        if (is_a($post, 'WP_Post') && has_shortcode($post->post_content, 'hvac_calculator')) {
            wp_enqueue_script('hvac-calculator-widget', plugin_dir_url(__FILE__) . '../hvac-calculator-widget.js', array(), '1.0', true);
        }
    }
    
    public function render_shortcode($atts) {
        $atts = shortcode_atts(array(
            'width' => '100%',
            'max_width' => '1200px',
            'velocity' => '2500',
            'friction' => '0.15',
            'show_header' => 'true',
            'show_table' => 'true',
            'container_id' => 'hvac-calc-' . uniqid()
        ), $atts);
        
        ob_start();
        ?>
        <div id="<?php echo esc_attr($atts['container_id']); ?>" 
             data-hvac-calculator
             data-velocity="<?php echo esc_attr($atts['velocity']); ?>"
             data-friction="<?php echo esc_attr($atts['friction']); ?>"
             data-width="<?php echo esc_attr($atts['width']); ?>"
             data-max-width="<?php echo esc_attr($atts['max_width']); ?>"
             data-show-header="<?php echo esc_attr($atts['show_header']); ?>"
             data-show-table="<?php echo esc_attr($atts['show_table']); ?>">
            <!-- HVAC Calculator will be loaded here -->
        </div>
        
        <script>
        document.addEventListener('DOMContentLoaded', function() {
            if (typeof HVACCalculatorWidget !== 'undefined') {
                new HVACCalculatorWidget('<?php echo esc_js($atts['container_id']); ?>', {
                    width: '<?php echo esc_js($atts['width']); ?>',
                    maxWidth: '<?php echo esc_js($atts['max_width']); ?>',
                    initialVelocity: <?php echo intval($atts['velocity']); ?>,
                    initialFriction: <?php echo floatval($atts['friction']); ?>,
                    showHeader: <?php echo $atts['show_header'] === 'true' ? 'true' : 'false'; ?>,
                    showTable: <?php echo $atts['show_table'] === 'true' ? 'true' : 'false'; ?>
                });
            }
        });
        </script>
        <?php
        return ob_get_clean();
    }
}

// Initialize the plugin
new HVACCalculatorPlugin();

// Add admin menu for settings (optional)
add_action('admin_menu', 'hvac_calculator_admin_menu');

function hvac_calculator_admin_menu() {
    add_options_page(
        'HVAC Calculator Settings',
        'HVAC Calculator',
        'manage_options',
        'hvac-calculator',
        'hvac_calculator_admin_page'
    );
}

function hvac_calculator_admin_page() {
    ?>
    <div class="wrap">
        <h1>HVAC Calculator Settings</h1>
        <div class="card">
            <h2>How to Use</h2>
            <p>Use the following shortcode in your posts or pages:</p>
            <code>[hvac_calculator]</code>
            
            <h3>Shortcode Parameters:</h3>
            <ul>
                <li><strong>width</strong> - Widget width (default: 100%)</li>
                <li><strong>max_width</strong> - Maximum width (default: 1200px)</li>
                <li><strong>velocity</strong> - Initial velocity value (default: 2500)</li>
                <li><strong>friction</strong> - Initial friction value (default: 0.15)</li>
                <li><strong>show_header</strong> - Show header (true/false, default: true)</li>
                <li><strong>show_table</strong> - Show results table (true/false, default: true)</li>
            </ul>
            
            <h3>Examples:</h3>
            <p><code>[hvac_calculator velocity="3000" friction="0.12"]</code></p>
            <p><code>[hvac_calculator width="80%" show_header="false"]</code></p>
        </div>
    </div>
    <?php
}
?>