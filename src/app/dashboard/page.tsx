// pages/dashboard.js
import React from "react";

const DashboardMaintenance = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <div className="text-center p-6 bg-white shadow-lg rounded-lg max-w-md w-full">
                <h1 className="text-3xl font-semibold text-gray-800">Em Manutenção</h1>
                <p className="mt-4 text-lg text-gray-600">
                    O dashboard está em manutenção no momento. Por favor, Aguarde até a próxima Sprint.
                </p>
                <p className="mt-6 text-gray-500">
                    Agradecemos pela sua paciência.
                </p>
                <div className="mt-6">
                    <a href="/login" className="text-blue-500 hover:underline">
                        Voltar para a página de Login
                    </a>
                </div>
            </div>
        </div>
    );
};

export default DashboardMaintenance;
