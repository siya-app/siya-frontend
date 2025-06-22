function PrivacyPolicy() {
    
  return (
    <>
      <div className="max-w-3xl mx-auto p-6 text-gray-800">
        <h2 className="text-2xl font-bold mb-4">
          🛡️ Política de Privacitat i Ús de Cookies – Siya
        </h2>

        <h3 className="font-semibold mt-4">1. Responsable del tractament</h3>
        <p>
          L’aplicació <strong>Siya</strong> és responsable del tractament de les
          teves dades personals. Per qualsevol dubte o sol·licitud relacionada
          amb la privacitat, pots contactar-nos a:
          <br />
          📩 <strong>siya.bcn.app[@]gmail.com</strong>
        </p>

        <h3 className="font-semibold mt-4">2. Dades que recollim</h3>
        <p>Quan et registres o utilitzes l’aplicació, podem recollir:</p>
        <ul className="list-disc ml-6">
          <li>
            Informació personal bàsica: nom, correu electrònic, rol d’usuari (
            <code>client</code> o <code>owner</code>), i dades associades a la
            teva activitat dins de Siya.
          </li>
          <li>
            Ubicació: utilitzem la teva ubicació per mostrar terrasses pròximes
            i oferir-te informació meteorològica rellevant.
          </li>
          <li>Informació sobre reserves i transaccions a través de Stripe.</li>
          <li>
            Dades de navegació a través de cookies i tecnologies similars.
          </li>
        </ul>

        <h3 className="font-semibold mt-4">3. Finalitat del tractament</h3>
        <p>Les teves dades són utilitzades per a:</p>
        <ul className="list-disc ml-6">
          <li>Gestionar el teu perfil i experiència dins de l’app.</li>
          <li>
            Mostrar terrasses properes i informació del clima segons la teva
            ubicació.
          </li>
          <li>Gestionar reserves i cobraments via Stripe.</li>
          <li>
            Millorar el servei, detectar errors i optimitzar la navegació.
          </li>
        </ul>

        <h3 className="font-semibold mt-4">4. Ús de cookies</h3>
        <p>A Siya utilitzem cookies per a:</p>
        <ul className="list-disc ml-6">
          <li>Recordar preferències de sessió.</li>
          <li>Millorar la teva experiència d’usuari.</li>
          <li>Recollir estadístiques anònimes d’ús.</li>
        </ul>
        <p>
          Pots configurar el teu navegador per bloquejar o eliminar les cookies,
          tot i que algunes funcionalitats podrien veure’s afectades.
        </p>

        <h3 className="font-semibold mt-4">5. Compartició de dades</h3>
        <p>
          Les teves dades <strong>no es venen ni es comparteixen</strong> amb
          tercers sense el teu consentiment, excepte quan sigui necessari per
          prestar el servei (per exemple, Stripe per processar pagaments).
        </p>

        <h3 className="font-semibold mt-4">6. Conservació de dades</h3>
        <p>
          Les dades personals es conserven mentre mantinguis el teu compte
          actiu. Pots sol·licitar-ne l’eliminació en qualsevol moment
          contactant-nos.
        </p>

        <h3 className="font-semibold mt-4">7. Drets dels usuaris</h3>
        <p>Tens dret a:</p>
        <ul className="list-disc ml-6">
          <li>Accedir a les teves dades.</li>
          <li>Sol·licitar la seva rectificació o eliminació.</li>
          <li>Oposar-te al tractament.</li>
          <li>Portar les teves dades a un altre proveïdor.</li>
        </ul>
        <p>
          Per exercir aquests drets, escriu-nos a:{" "}
          <strong>siya.bcn.app[@]gmail.com</strong>
        </p>

        <h3 className="font-semibold mt-4">8. Canvis en aquesta política</h3>
        <p>
          Podem actualitzar aquesta política per adaptar-la a canvis legals o
          tècnics. Informarem d’aquests canvis a través de l’aplicació.
        </p>

        <p className="text-center mt-8 font-medium">
          🙏 Gràcies per confiar en Siya!
        </p>
      </div>
    </>
  );
}

export default PrivacyPolicy;
