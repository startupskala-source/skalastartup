import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";

const PrivacyPolicy = () => {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Header />
      
      <div className="container mx-auto px-6 md:px-12 pt-32 pb-20">
        <Link 
          to="/" 
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors mb-8"
        >
          <ArrowLeft className="w-4 h-4" />
          Voltar
        </Link>

        <h1 className="font-display text-4xl md:text-5xl font-bold mb-8">
          Política de Privacidade
        </h1>

        <div className="prose prose-invert max-w-none space-y-8">
          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">1. Informações Gerais</h2>
            <p className="text-muted-foreground leading-relaxed">
              A SKALA está comprometida em proteger a privacidade dos usuários de nosso site. 
              Esta Política de Privacidade descreve como coletamos, usamos e protegemos suas informações pessoais.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">2. Coleta de Informações</h2>
            <p className="text-muted-foreground leading-relaxed">
              Coletamos informações que você nos fornece diretamente, como nome, e-mail e telefone 
              quando você entra em contato conosco ou solicita uma consultoria. Também podemos coletar 
              informações automaticamente, como dados de navegação e cookies.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">3. Uso das Informações</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Utilizamos suas informações para:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Responder às suas solicitações e fornecer nossos serviços</li>
              <li>Enviar comunicações sobre nossos serviços e novidades</li>
              <li>Melhorar nosso site e experiência do usuário</li>
              <li>Cumprir obrigações legais</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">4. Compartilhamento de Dados</h2>
            <p className="text-muted-foreground leading-relaxed">
              Não vendemos, alugamos ou compartilhamos suas informações pessoais com terceiros, 
              exceto quando necessário para fornecer nossos serviços ou quando exigido por lei.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">5. Segurança</h2>
            <p className="text-muted-foreground leading-relaxed">
              Implementamos medidas de segurança técnicas e organizacionais para proteger suas 
              informações contra acesso não autorizado, alteração, divulgação ou destruição.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">6. Seus Direitos</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Você tem o direito de:
            </p>
            <ul className="list-disc list-inside text-muted-foreground space-y-2">
              <li>Acessar suas informações pessoais</li>
              <li>Corrigir dados incorretos ou incompletos</li>
              <li>Solicitar a exclusão de seus dados</li>
              <li>Retirar seu consentimento a qualquer momento</li>
            </ul>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">7. Cookies</h2>
            <p className="text-muted-foreground leading-relaxed">
              Utilizamos cookies para melhorar sua experiência de navegação. Você pode configurar 
              seu navegador para recusar cookies, mas isso pode afetar a funcionalidade do site.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">8. Alterações na Política</h2>
            <p className="text-muted-foreground leading-relaxed">
              Podemos atualizar esta política periodicamente. Recomendamos que você revise esta 
              página regularmente para se manter informado sobre quaisquer alterações.
            </p>
          </section>

          <section>
            <h2 className="font-display text-2xl font-semibold mb-4">9. Contato</h2>
            <p className="text-muted-foreground leading-relaxed">
              Se você tiver dúvidas sobre esta Política de Privacidade, entre em contato conosco 
              através do nosso formulário de contato ou WhatsApp.
            </p>
          </section>

          <p className="text-muted-foreground text-sm mt-12">
            Última atualização: {new Date().toLocaleDateString("pt-BR", { month: "long", year: "numeric" })}
          </p>
        </div>
      </div>

      <Footer />
    </main>
  );
};

export default PrivacyPolicy;
