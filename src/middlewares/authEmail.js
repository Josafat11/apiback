import { transporter } from '../libs/emailConfig'; // Importa el transporter de correo electrónico

export const verifyEmail = async (email, codigoSecreto) => {
    try {
        await new Promise((resolve, reject) => {
            transporter.sendMail({
                from: '"Código de Verificación" <jose1fat@gmail.com>', // Dirección de correo del remitente
                to: email, // Dirección de correo del destinatario
                subject: "Código de Verificación", // Asunto del correo
                html: `
                    <html>
                        <head>
                            <style>
                                /* Estilos CSS */
                                .bg-white {
                                    background-color: #fff;
                                }
                                .shadow-xl {
                                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                                }
                                .w-50 {
                                    width: 100%;
                                }
                                .h-30 {
                                    height: 100%;
                                }
                                .rounded-3xl {
                                    border-radius: 1.5rem;
                                }
                                .flex {
                                    display: flex;
                                }
                                .flex-col {
                                    flex-direction: column;
                                }
                                .justify-center {
                                    justify-content: center;
                                }
                                .items-center {
                                    align-items: center;
                                }
                                .font-bold {
                                    font-weight: bold;
                                }
                                .text-3xl {
                                    font-size: 1.875rem;
                                }
                                .text-2xl {
                                    font-size: 1.5rem;
                                }
                                .text-red-500 {
                                    color: #f56565;
                                }
                            </style>
                        </head>
                        <body>
                            <!-- Contenido HTML del correo -->
                            <div class="bg-white shadow-xl w-50 h-30 rounded-3xl flex flex-col">
                                <div class="flex w-full h-30 justify-center items-center">
                                    <h1 class="font-bold text-3xl">Código de verificación</h1>
                                </div>
                                <div class="flex w-full flex-col justify-center items-center mb-10">
                                    <h2 class="font-bold text-2xl">Este código es válido por un solo intento</h2>
                                    <p class="text-2xl">Su código es: ${codigoSecreto}</p>
                                </div>
                                <div class="flex justify-center items-center">
                                    <h1 class="text-red-500 font-bold text-2xl">Si usted no generó algún código de verificación, ignore este correo</h1>
                                </div>
                            </div>
                        </body>
                    </html>
                `, // Contenido HTML del correo
            }, (err, info) => {
                if (err) {
                    console.error(err);
                    reject(err);
                } else {
                    console.log(info);
                    resolve(info);
                }
            });
        });

        return true; // Retorna verdadero si el correo se envió correctamente
    } catch (error) {
        console.error(error);
        return false; // Retorna falso si hubo un error al enviar el correo
    }
};
