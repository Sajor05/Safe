#include <WiFi.h>
#include <WebServer.h>
// Librerías de Sensores
#include <Wire.h> // Para I2C
#include <HardwareSerial.h> // Para el GPS
#include "Adafruit_BMP280.h"
#include "MAX30105.h" // Usaremos esta como ejemplo, adapta a tu librería
#include "heartRate.h" // Funciones para MAX30102
#include <TinyGPSPlus.h>

// ----------------------
// 1. Configuracion WiFi
// ----------------------
const char* ssid = "TU_WIFI_SSID";
const char* password = "TU_WIFI_PASSWORD";
WebServer server(80);

// ----------------------
// 2. Objetos de Sensores
// ----------------------
Adafruit_BMP280 bmp; // Objeto BMP280
MAX30105 particleSensor; // Objeto MAX30102
TinyGPSPlus gps; // Objeto GPS
HardwareSerial SerialGPS(2); // Usaremos UART 2 (GPIO 16/17)

// Variables para almacenar lecturas de sensores
float bpmValue = 0.0;
float spo2Value = 0.0;
float tempC_BMP = 0.0;
float pressure_BMP = 0.0;
float latitude = 0.0;
float longitude = 0.0;
String gpsTime = "Sin datos";

// ------------------------------------
// 3. Funciones de Lectura de Sensores
// ------------------------------------
void readSensors() {
    // A. Lectura MAX30102 (I2C)
    long irValue = particleSensor.get  IR();
    if (checkFor  Beat(irValue) == true) {
        // Se detectó un latido, actualiza BPM
        bpmValue = get  10BPM();
    }
    // NOTA: El cálculo del SpO2 es complejo y requiere un algoritmo.
    // Por simplicidad, aquí se muestra solo el BPM. Usa el algoritmo
    // de tu librería MAX30102 para calcular SpO2.
    // spo2Value = obtener  Spo2();
    spo2Value = random(950, 999) / 10.0; // Valor de prueba

    // B. Lectura BMP280 (I2C)
    tempC_BMP = bmp.readTemperature();
    pressure_BMP = bmp.readPressure() / 100.0F; // Presión en hPa (o mbar)

    // C. Lectura NEO-6M (UART/Serial2)
    while (SerialGPS.available() > 0) {
        if (gps.encode(SerialGPS.read())) {
            if (gps.location.isValid()) {
                latitude = gps.location.lat();
                longitude = gps.location.lng();
            }
            if (gps.time.isValid()) {
                gpsTime = String(gps.time.hour()) + ":" + String(gps.time.minute()) + ":" + String(gps.time.second());
            }
        }
    }
}

// --------------------------------------
// 4. Generación de la Página Web (HTML)
// --------------------------------------
String getWebPage() {
    // Leer los datos justo antes de generar la página
    readSensors();
   
    String html = "<!DOCTYPE html>";
    html += "<html>";
    html += "<head>";
    // CSS para el formato requerido: Arial, Tamaño 24, Recarga auto.
    html += "<meta http-equiv='refresh' content='5'>"; // Auto-recarga cada 5s
    html += "<meta name='viewport' content='width=device-width, initial-scale=1'>";
    html += "<title>Monitoreo ESP32</title>";
    html += "<style>";
    html += "body { font-family: Arial, sans-serif; background-color: #f0f0f0; }";
    html += ".container { max-width: 600px; margin: 50px auto; padding: 20px; border: 1px solid #ccc; background-color: #fff; box-shadow: 2px 2px 5px rgba(0,0,0,0.1); }";
    html += "h1 { color: #333; text-align: center; }";
    html += ".data-item { font-size: 24px; margin: 10px 0; padding: 10px; border-bottom: 1px dotted #ccc; }";
    html += ".label { font-weight: bold; color: #0066cc; width: 40%; display: inline-block; }";
    html += ".value { color: #333; }";
    html += "</style>";
    html += "</head>";
    html += "<body>";
   
    html += "<div class='container'>";
    html += "<h1>Monitoreo de Sensores ESP32</h1>";
   
    // MAX30102
    html += "<div class='data-item'><span class='label'>Frecuencia Cardíaca:</span> <span class='value'>" + String(bpmValue, 1) + " BPM</span></div>";
    html += "<div class='data-item'><span class='label'>Saturación de O₂:</span> <span class='value'>" + String(spo2Value, 1) + " %</span></div>";

    // BMP280
    html += "<div class='data-item'><span class='label'>Temperatura (BMP):</span> <span class='value'>" + String(tempC_BMP, 2) + " °C</span></div>";
    html += "<div class='data-item'><span class='label'>Presión Atmosférica:</span> <span class='value'>" + String(pressure_BMP, 2) + " hPa</span></div>";

    // NEO-6M
    html += "<div class='data-item'><span class='label'>Latitud (GPS):</span> <span class='value'>" + String(latitude, 6) + "</span></div>";
    html += "<div class='data-item'><span class='label'>Longitud (GPS):</span> <span class='value'>" + String(longitude, 6) + "</span></div>";
    html += "<div class='data-item'><span class='label'>Hora GPS:</span> <span class='value'>" + gpsTime + " UTC</span></div>";
   
    html += "</div>";
    html += "</body>";
    html += "</html>";
    return html;
}

// ------------------------------------
// 5. Manejador de Solicitudes Web
// ------------------------------------
void handleRoot() {
    server.send(200, "text/html", getWebPage());
}

// ------------------------------------
// 6. Configuración (setup)
// ------------------------------------
void setup() {
    Serial.begin(115200);
    Wire.begin(21, 22); // Inicializa I2C en GPIO 21 (SDA) y 22 (SCL)
    SerialGPS.begin(9600, SERIAL_8N1, 16, 17); // Inicializa Serial2 para GPS (RX=16, TX=17)

    // Inicializar BMP280
    if (!bmp.begin()) {
        Serial.println("BMP280 no encontrado. Revisa el cableado.");
    } else {
        Serial.println("BMP280 OK.");
        // Configuración para mayor precisión
        bmp.setSampling(Adafruit_BMP280::MODE_NORMAL,     /* Modo de medición */
                        Adafruit_BMP280::SAMPLING_X2,     /* Temp sampling */
                        Adafruit_BMP280::SAMPLING_X16,    /* Pressure sampling */
                        Adafruit_BMP280::FILTER_X16,      /* Filter */
                        Adafruit_BMP280::STANDBY_MS_500); /* Standby time */
    }

    // Inicializar MAX30102
    if (!particleSensor.begin(Wire, I2C_SPEED_FAST)) { // Usa Wire y alta velocidad
        Serial.println("MAX30102 no encontrado. Revisa el cableado.");
    } else {
        Serial.println("MAX30102 OK.");
        particleSensor.setup(); // Configuración por defecto
        // Ajustes para pulsioximetría (pueden requerir ajuste fino)
        particleSensor.setPulseAmplitudeRed(0x0A);
        particleSensor.setPulseAmplitudeIR(0x0A);
    }
   
    // Conexión WiFi
    Serial.print("Conectando a WiFi ");
    WiFi.begin(ssid, password);
    while (WiFi.status() != WL_CONNECTED) {
        delay(500);
        Serial.print(".");
    }
    Serial.println("");
    Serial.println("WiFi conectado.");
    Serial.print("Dirección IP: ");
    Serial.println(WiFi.localIP());

    // Iniciar Servidor Web
    server.on("/", handleRoot);
    server.begin();
    Serial.println("Servidor HTTP iniciado.");
}

// ------------------------------------
// 7. Bucle Principal (loop)
// ------------------------------------
void loop() {
    server.handleClient();
    // La lectura de sensores se hace dentro de getWebPage() para garantizar
    // que los datos son frescos en cada actualización del navegador.
    // También puedes mover la lectura aquí y hacerla periódica si usas AsyncWebServer.
   
    // Si usas TinyGPSPlus, es crucial procesar el buffer del GPS constantemente
    // para obtener una posición válida lo antes posible.
    // La función readSensors() ya incluye la lectura constante del buffer.
}



*Este es para un esp32 común, nosotros usamos el C3*