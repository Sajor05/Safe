export default class User {
  constructor(
    id,
    name,
    saturacion,
    temperatura,
    frecuencia,
    hora,
    minutos,
    segundos,
    presion,
    latitud,
    longitud
  ) {
    this.id = id;
    this.name = `${name.toUpperCase()}`;
    this.saturacion = saturacion;
    this.temperatura = temperatura;
    this.frecuencia = frecuencia;
    this.hora = `${hora.toString()}:${minutos.toString()}:${segundos.toString()}`;
    this.presion = presion;
    this.latitud = latitud;
    this.longitud = longitud;
  }

  userView() {
    return `
        <section class="user-card">
          <div class="user-card-form">
            <button class="user-card-openform">!</button>
          </div>
          <header class="user-card-username">
            <h4>${this.name}</h4>
          </header>
          <section class="user-card-location">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1951.0355817609109!2d-58.72243324074303!3d-34.67395099960236!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcbffae4d81fc9%3A0x11904f58bef60c45!2sEscuela%20T%C3%A9cnica%201!5e0!3m2!1ses!2sar!4v1761688313271!5m2!1ses!2sar"
              width="250"
              height="150"
              style="border: 1px solid #ccc; border-radius: 5px"
              loading="lazy"
              referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </section>
          <!-------------
          -- D A T O S --
          -------------->
          <section class="user-card-data">
            <!-- S A T U R A C I O N -->
            <div class="data-items">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#cc2900"
                  d="M320 576C214 576 128 490 128 384C128 292.8 258.2 109.9 294.6 60.5C300.5 52.5 309.8 48 319.8 48L320.2 48C330.2 48 339.5 52.5 345.4 60.5C381.8 109.9 512 292.8 512 384C512 490 426 576 320 576zM240 376C240 362.7 229.3 352 216 352C202.7 352 192 362.7 192 376C192 451.1 252.9 512 328 512C341.3 512 352 501.3 352 488C352 474.7 341.3 464 328 464C279.4 464 240 424.6 240 376z"
                />
              </svg>
              <div class="data-info">
                <span class="key">Saturación de O₂: </span>
                <span class="value">${this.saturacion}%</span>
              </div>
            </div>

            <!-- T E M P E R A T U R A -->
            <div class="data-items">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#eaa81a"
                  d="M160 160C160 107 203 64 256 64C309 64 352 107 352 160L352 324.7C381.5 351.1 400 389.4 400 432C400 511.5 335.5 576 256 576C176.5 576 112 511.5 112 432C112 389.4 130.5 351 160 324.7L160 160zM256 496C291.3 496 320 467.3 320 432C320 405.1 303.5 382.1 280 372.7L280 344C280 330.7 269.3 320 256 320C242.7 320 232 330.7 232 344L232 372.7C208.5 382.2 192 405.2 192 432C192 467.3 220.7 496 256 496zM528 144C528 126.3 513.7 112 496 112C478.3 112 464 126.3 464 144C464 161.7 478.3 176 496 176C513.7 176 528 161.7 528 144zM416 144C416 99.8 451.8 64 496 64C540.2 64 576 99.8 576 144C576 188.2 540.2 224 496 224C451.8 224 416 188.2 416 144z"
                />
              </svg>
              <div class="data-info">
                <span class="key">Temperatura (BMP): </span>
                <span class="value"> ${this.temperatura}°C</span>
              </div>
            </div>

            <!-- F R E C U E N C I A  C A R D I A C A -->

            <div class="data-items">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#0066cc"
                  d="M320 171.9L305 151.1C280 116.5 239.9 96 197.1 96C123.6 96 64 155.6 64 229.1L64 231.7C64 255.3 70.2 279.7 80.6 304L186.6 304C189.8 304 192.7 302.1 194 299.1L225.8 222.8C229.5 214 238.1 208.2 247.6 208C257.1 207.8 265.9 213.4 269.8 222.1L321.1 336L362.5 253.2C366.6 245.1 374.9 239.9 384 239.9C393.1 239.9 401.4 245 405.5 253.2L428.7 299.5C430.1 302.2 432.8 303.9 435.9 303.9L559.5 303.9C570 279.6 576.1 255.2 576.1 231.6L576.1 229C576 155.6 516.4 96 442.9 96C400.2 96 360 116.5 335 151.1L320 171.8zM533.6 352L435.8 352C414.6 352 395.2 340 385.7 321L384 317.6L341.5 402.7C337.4 411 328.8 416.2 319.5 416C310.2 415.8 301.9 410.3 298.1 401.9L248.8 292.4L238.3 317.6C229.6 338.5 209.2 352.1 186.6 352.1L106.4 352.1C153.6 425.9 229.4 493.8 276.8 530C289.2 539.4 304.4 544.1 319.9 544.1C335.4 544.1 350.7 539.5 363 530C410.6 493.7 486.4 425.8 533.6 352z"
                />
              </svg>
              <div class="data-info">
                <span class="key"> Frecuencia Cardiaca: </span>
                <span class="value">${this.frecuencia} BPM</span>
              </div>
            </div>

            <!-- H O R A -->
            <div class="data-items">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#0066cc"
                  d="M320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320C64 178.6 178.6 64 320 64zM296 184L296 320C296 328 300 335.5 306.7 340L402.7 404C413.7 411.4 428.6 408.4 436 397.3C443.4 386.2 440.4 371.4 429.3 364L344 307.2L344 184C344 170.7 333.3 160 320 160C306.7 160 296 170.7 296 184z"
                />
              </svg>
              <div class="data-info">
                <span class="key">Hora GPS:</span>
                <span class="value">${this.hora} UTC</span>
              </div>
            </div>

            <!-- P R E S I Ó N  A T M O S F É R I C A -->
            <div class="data-items">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  fill="#0066cc"
                  d="M64 320C64 178.6 178.6 64 320 64C461.4 64 576 178.6 576 320C576 461.4 461.4 576 320 576C178.6 576 64 461.4 64 320zM352 160C352 142.3 337.7 128 320 128C302.3 128 288 142.3 288 160C288 177.7 302.3 192 320 192C337.7 192 352 177.7 352 160zM320 480C355.3 480 384 451.3 384 416C384 399.8 378 384.9 368 373.7L437.5 234.8C443.4 222.9 438.6 208.5 426.8 202.6C415 196.7 400.5 201.5 394.6 213.3L325.1 352.2C323.4 352.1 321.7 352 320 352C284.7 352 256 380.7 256 416C256 451.3 284.7 480 320 480zM240 208C240 190.3 225.7 176 208 176C190.3 176 176 190.3 176 208C176 225.7 190.3 240 208 240C225.7 240 240 225.7 240 208zM160 352C177.7 352 192 337.7 192 320C192 302.3 177.7 288 160 288C142.3 288 128 302.3 128 320C128 337.7 142.3 352 160 352zM512 320C512 302.3 497.7 288 480 288C462.3 288 448 302.3 448 320C448 337.7 462.3 352 480 352C497.7 352 512 337.7 512 320z"
                />
              </svg>
              <div class="data-info">
                <span class="key">Presión Atmosférica: </span>
                <span class="value">${this.presion} hPa</span>
              </div>
            </div>

            <!-- L A T I T U D -->
            <div class="data-items">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M342.6 81.4C330.1 68.9 309.8 68.9 297.3 81.4L137.3 241.4C124.8 253.9 124.8 274.2 137.3 286.7C149.8 299.2 170.1 299.2 182.6 286.7L288 181.3L288 552C288 569.7 302.3 584 320 584C337.7 584 352 569.7 352 552L352 181.3L457.4 286.7C469.9 299.2 490.2 299.2 502.7 286.7C515.2 274.2 515.2 253.9 502.7 241.4L342.7 81.4z"
                />
              </svg>
              <div class="data-info">
                <span class="key">Latitud (GPS):</span>
                <span class="value">${this.latitud}</span>
              </div>
            </div>

            <!-- L O N G I T U D -->
            <div class="data-items-last">
              <svg
                class="icons"
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 640 640"
              >
                <!--!Font Awesome Free v7.1.0 by @fontawesome - https://fontawesome.com License - https://fontawesome.com/license/free Copyright 2025 Fonticons, Inc.-->
                <path
                  d="M566.6 342.6C579.1 330.1 579.1 309.8 566.6 297.3L406.6 137.3C394.1 124.8 373.8 124.8 361.3 137.3C348.8 149.8 348.8 170.1 361.3 182.6L466.7 288L96 288C78.3 288 64 302.3 64 320C64 337.7 78.3 352 96 352L466.7 352L361.3 457.4C348.8 469.9 348.8 490.2 361.3 502.7C373.8 515.2 394.1 515.2 406.6 502.7L566.6 342.7z"
                />
              </svg>
              <span class="key">Longitud (GPS):</span>
              <span class="value">${this.longitud}</span>
            </div>
          </section>
        </section>
        
        `;
  }
}
