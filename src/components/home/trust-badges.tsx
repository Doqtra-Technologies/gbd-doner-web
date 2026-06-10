import { Container } from "@/components/ui/container";

export function TrustBadges() {
  return (
    <section className="bg-[#0A121C] py-12 md:py-16">
      <Container>
        <div className="flex flex-col items-center justify-center gap-12 lg:flex-row lg:gap-20">
          
          {/* Awards Box - Glassmorphism */}
          <div className="flex items-center justify-center rounded-[20px] border border-white/10 bg-white/[0.03] py-5 px-6 backdrop-blur-md sm:px-10 lg:py-6 lg:px-12">
            <div className="flex items-center gap-4">
              <span aria-hidden className="h-2 w-2 rounded-full bg-gbd-red shadow-[0_0_8px_rgba(201,64,53,0.8)]" />
              <span className="font-display text-xs font-bold tracking-[0.15em] text-white uppercase sm:text-sm lg:text-base">
                British Kebab Awards <span className="mx-2 text-white/30 lg:mx-3">•</span> Peta Approved
              </span>
            </div>
          </div>

          {/* Rating Card with Offset Shadow */}
          <div className="relative">
            {/* Offset shadow */}
            <div className="absolute inset-0 translate-x-3 -translate-y-3 bg-[#D4958F] sm:translate-x-4 sm:-translate-y-4" />
            
            {/* Dark card */}
            <div className="relative flex min-w-[280px] flex-col justify-center bg-gbd-navy px-8 py-6 text-white shadow-2xl sm:min-w-[320px] sm:px-10 sm:py-8 border border-white/5">
              <div className="flex items-center gap-2">
                <span className="font-display text-[4rem] font-bold leading-none tracking-tight sm:text-[5.5rem]">
                  4.9
                </span>
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="mt-2 h-10 w-10 sm:mt-4 sm:h-12 sm:w-12">
                  <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
                </svg>
              </div>
              <span className="mt-2 font-body text-sm text-white/70 sm:text-base">
                Average Google rating across our stores
              </span>
            </div>
          </div>

        </div>
      </Container>
    </section>
  );
}
