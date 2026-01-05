import Image from "next/image";
import Link from "next/link";

const socialLinks = [
  { name: "GitHub", href: "https://github.com/peanutoil" },
  { name: "LinkedIn", href: "https://linkedin.com/in/harinibuddaluru" },
  { name: "Email", href: "mailto:hb2657@nyu.edu" },
];

const workExperience = [
  {
    title: "AI Scientist",
    company: "Grata",
    period: "Sep. 2025 - Present",
    description: "...",
  },
  {
    title: "Data Scientist Intern",
    company: "Cambridge SupTech Lab",
    period: "Jun. 2025 - Aug. 2025",
    description: "...",
  },
  {
    title: "Data Engineer Intern",
    company: "MSKCC",
    period: "Jun. 2024 - Aug. 2024",
    description: "...",
  },
];

const interests = [
  "AI/ML",
  "Data Science",
  "Data Engineering",
  "RAG/LLMs",
  "Data Analysis/Insights",
];
const skills = {
  frontend: ["Python", "DS", "Databricks", "PyTorch"],
  backend: ["TensorFlow", "sci-kit learn", "LLMs", "BERT"],
};

export default function Home() {
  return (
    <div className="max-w-5xl mx-auto px-6 py-12">
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
        {/* Left Sidebar */}
        <div className="lg:col-span-1 space-y-6">
          {/* Profile */}
          <div className="industrial-box">
            <div className="industrial-header">PROFILE</div>
            <div className="text-center">
              <div className="metal-frame w-40 h-40 mb-4 mx-auto relative flex items-center justify-center" style={{
                background: 'linear-gradient(135deg, #ffb3d9 0%, #ff69b4 100%)'
              }}>
                <div className="text-6xl">♡</div>
              </div>
              {/* Replace with: <Image src="/your-photo.jpg" alt="Your Name" width={160} height={160} className="metal-frame mx-auto mb-4" /> */}

              <h2 className="text-xl font-bold chrome-text mb-2 uppercase tracking-wider">
                Harini Buddaluru
              </h2>
              <p className="text-xs mb-2 uppercase tracking-wide font-bold text-pink-accent">
                Data Scientist
              </p>
              <p className="italic text-xs mb-4 text-pink-light">
                ML/AI Engineer
              </p>
            </div>
          </div>

          {/* Contact */}
          <div className="industrial-box industrial-box-silver">
            <div className="industrial-header industrial-header-silver">
              CONTACT
            </div>
            <div className="space-y-2">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-2 text-xs uppercase tracking-wider inset-panel hover:bg-white/80 transition-all font-bold"
                >
                  <span className="text-pink">{link.name}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Interests */}
          <div className="industrial-box">
            <div className="industrial-header">INTERESTS</div>
            <div className="flex flex-wrap gap-2">
              {interests.map((interest, index) => (
                <span key={index} className="metal-tag">
                  {interest}
                </span>
              ))}
            </div>
          </div>

          {/* Quick Access */}
          <div className="industrial-box">
            <div className="industrial-header">QUICK ACCESS</div>
            <div className="space-y-2">
              <Link href="/blog" className="block metal-button text-center">
                BLOG
              </Link>
              <Link href="/feed" className="block metal-button text-center">
                FEED
              </Link>
              <Link
                href="/contact"
                className="block metal-button-silver metal-button text-center"
              >
                CONTACT
              </Link>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="lg:col-span-3 space-y-6">
          {/* About */}
          <div className="industrial-box corner-brackets">
            <div className="industrial-header">ABOUT</div>
            <div className="leading-relaxed space-y-4 text-sm text-pink">
              <p>
                <span className="chrome-text font-bold text-lg">WELCOME.</span>
              </p>
              <p>
                I am a{" "}
                <span className="subtle-glow font-bold text-pink-bright">
                  data scientist
                </span>{" "}
                with experience in AI/ML engineering. I graduated from NYU in
                2025 with a Joint Bachelor's Degree in Computer Science and Data
                Science. My passion lies in leveraging data to drive insights
                and build intelligent systems that solve real-world problems.
              </p>
            </div>
          </div>

          {/* Experience */}
          <div className="industrial-box industrial-box-silver">
            <div className="industrial-header industrial-header-silver">
              EXPERIENCE
            </div>
            <div className="space-y-4">
              {workExperience.map((job, index) => (
                <div key={index} className="inset-panel relative">
                  <div className="flex items-start justify-between mb-2">
                    <h3 className="text-sm font-bold uppercase tracking-wide text-pink">
                      {job.title}
                    </h3>
                    <span className="data-display text-xs font-bold">
                      {job.period}
                    </span>
                  </div>
                  <p className="text-xs mb-2 uppercase tracking-wider font-bold text-pink-accent">
                    {job.company}
                  </p>
                  <p className="text-xs leading-relaxed text-pink">
                    {job.description}
                  </p>
                </div>
              ))}
            </div>
          </div>

          {/* Skills */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="industrial-box">
              <div className="industrial-header">SKILLS</div>
              <div className="space-y-2">
                {skills.frontend.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-accent"></div>
                    <span className="text-xs uppercase tracking-wide font-bold text-pink">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            <div className="industrial-box industrial-box-silver">
              <div className="industrial-header industrial-header-silver">
                SKILLS
              </div>
              <div className="space-y-2">
                {skills.backend.map((skill, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <div className="w-1 h-1 bg-pink-pastel"></div>
                    <span className="text-xs uppercase tracking-wide font-bold text-pink">
                      {skill}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="industrial-box text-center">
            <div className="industrial-header">CONNECT</div>
            <p className="mb-6 text-sm leading-relaxed text-pink">
              Explore my learnings, browse recent updates, or get in touch for
              collaboration opportunities.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link href="/blog" className="metal-button">
                VIEW BLOG
              </Link>
              <Link href="/feed" className="metal-button">
                VIEW FEED
              </Link>
              <Link
                href="/contact"
                className="metal-button-silver metal-button"
              >
                GET IN TOUCH
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
