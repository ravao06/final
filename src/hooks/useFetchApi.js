import { getWAFEnv } from "../utils"

/**
 * Utilise AWS WAF Captcha pour effectuer une requête fetch sécurisée.
 *
 * @returns {Function} Une fonction `captchaFetch` permettant d'effectuer une requête fetch après validation du captcha.
 */
export function useFetchApi() {
    /**
     * Effectue une requête fetch avec validation via AWS WAF Captcha.
     *
     * @param {Request|string} input - L'entrée pour la requête fetch (URL ou objet Request).
     * @param {RequestInit} init - Les options de la requête fetch (headers, méthode, corps, etc.).
     * @returns {Promise<Response>} Une promesse qui se résout avec la réponse fetch après validation du captcha.
     */
    function fetchApi(input, init) {
        document.body.style.cursor = 'wait'
        document.getElementById('modalOverlay').style.display = 'block'
        document.getElementById('modal').style.display = 'block'

        return new Promise((resolve) => {
            window.AwsWafCaptcha.renderCaptcha(document.getElementById('captchaForm'), {
                onSuccess: () => {
                    document.getElementById('modalOverlay').style.display = 'none'
                    document.getElementById('modal').style.display = 'none'
                    resolve(window.AwsWafIntegration.fetch(input, init))
                },
                onLoad: () => {
                    document.body.style.cursor = 'default'
                },
                apiKey: getWAFEnv().VITE_API_KEY
            })
        })
    }

    return { fetchApi }
}
