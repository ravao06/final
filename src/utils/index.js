export async function loadWAFEnv() {
  try {
    const envData = await fetchEnvironment(); 
    window.AWS_WAF_ENV = envData;
  } catch (error) {
    console.error('Failed to load AWS WAF environment:', error);
  }
}

async function fetchEnvironment() {
  return new Promise((resolve) => {
      resolve(import.meta.env);
  });
}

  export function getWAFEnv () {
    return window.AWS_WAF_ENV
  }

  export function loadScript () {
    if (document.getElementById('AwsWAFScript')) return

    const AwsWafScript = document.createElement('script')
    AwsWafScript.id = 'AwsWAFScript'
    AwsWafScript.async = false
    AwsWafScript.src = getWAFEnv().VITE_JSAPI_URL
    document.head.appendChild(AwsWafScript)
  }