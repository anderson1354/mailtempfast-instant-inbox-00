
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import NotFound from "./pages/NotFound";
import Privacy from "./pages/Privacidade";
import Contact from "./pages/Contato";
import About from "./pages/Sobre";
import Termos from "./pages/Termos";
import Blog from "./pages/Blog";
import ComoUsar from "./pages/blog/ComoUsar";
import EviteSpam from "./pages/blog/EviteSpam";
import PorqueProteger from "./pages/blog/PorqueProteger";
import ComoProtegerPhishing from "./pages/blog/ComoProtegerPhishing";
import GuiaCompletoEmailsTemporarios from "./pages/guides/GuiaCompletoEmailsTemporarios";
import FaqDetalhada from "./pages/faq/FaqDetalhada";
import GlossarioSegurancaDigital from "./pages/glossary/GlossarioSegurancaDigital";

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Index />} />
      <Route path="/privacidade" element={<Privacy />} />
      <Route path="/contato" element={<Contact />} />
      <Route path="/sobre" element={<About />} />
      <Route path="/termos" element={<Termos />} />
      <Route path="/blog" element={<Blog />} />
      <Route path="/blog/como-usar" element={<ComoUsar />} />
      <Route path="/blog/evite-spam" element={<EviteSpam />} />
      <Route path="/blog/por-que-proteger" element={<PorqueProteger />} />
      <Route path="/blog/como-proteger-se-de-phishing" element={<ComoProtegerPhishing />} />
      <Route path="/guias/guia-completo-emails-temporarios" element={<GuiaCompletoEmailsTemporarios />} />
      <Route path="/faq" element={<FaqDetalhada />} />
      <Route path="/glossario" element={<GlossarioSegurancaDigital />} />
      <Route path="*" element={<NotFound />} />
    </Routes>
  </BrowserRouter>
);

export default App;
