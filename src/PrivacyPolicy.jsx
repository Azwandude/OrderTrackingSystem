import {
  ArrowLeft,
  CheckCircle2,
  Clock3,
  Eye,
  LockKeyhole,
  PackageCheck,
  ShieldCheck,
} from 'lucide-react'

const sections = [
  { id: 'information', label: 'Information used' },
  { id: 'use', label: 'How it is used' },
  { id: 'sharing', label: 'Service providers' },
  { id: 'retention', label: 'Storage and retention' },
  { id: 'choices', label: 'Your choices' },
  { id: 'security', label: 'Security' },
]

function PrivacyPolicy() {
  return (
    <div className="flex min-h-screen flex-col bg-zinc-50 font-sans text-zinc-950 antialiased selection:bg-zinc-900 selection:text-white">
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          <a href="/" className="flex items-center gap-3" aria-label="AZPN Printing HQ home">
            <span className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-950 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <span className="font-sans text-[10px] font-extrabold italic tracking-tighter text-zinc-950">
                AZPN<span className="not-italic">.</span>
              </span>
            </span>
            <span className="h-4 w-px bg-zinc-200" />
            <span className="text-base font-bold tracking-tight text-zinc-950">AZPNPrinting HQ</span>
          </a>
          <a
            href="/"
            className="inline-flex items-center gap-2 text-xs font-semibold tracking-wide text-zinc-500 transition-colors hover:text-zinc-950"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            <span className="hidden sm:inline">Back to tracking</span>
            <span className="sm:hidden">Back</span>
          </a>
        </div>
      </header>

      <main className="mx-auto w-full max-w-5xl flex-1 px-6 py-10 md:py-16">
        <div className="mx-auto max-w-4xl">
          <div className="mb-8 space-y-4">
            <div className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3 py-1.5 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
              <ShieldCheck className="h-3.5 w-3.5 text-zinc-800" />
              AZPN Printing HQ
            </div>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div className="space-y-3">
                <h1 className="text-4xl font-extrabold leading-none tracking-tight text-zinc-950 md:text-5xl">
                  PRIVACY POLICY.
                </h1>
                <p className="max-w-2xl text-sm font-medium leading-relaxed text-zinc-500 md:text-base">
                  This notice explains how information is used when you check the progress of a custom apparel order through our tracking page.
                </p>
              </div>
              <p className="shrink-0 text-[11px] font-medium text-zinc-400">Last updated: 16 October 2026</p>
            </div>
          </div>

          <div className="mb-8 grid gap-4 rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] sm:grid-cols-[auto_1fr] sm:items-start sm:p-6">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-zinc-950 text-white">
              <Eye className="h-5 w-5" />
            </div>
            <div className="space-y-1.5">
              <h2 className="text-sm font-bold tracking-tight text-zinc-950">Your Order ID can show order details</h2>
              <p className="text-xs leading-relaxed text-zinc-500 md:text-sm">
                The tracker uses the Order ID you enter to retrieve an order record. Anyone who has a valid Order ID may be able to see the details displayed for that order, so keep it private and only look up an order you are allowed to access.
              </p>
            </div>
          </div>

          <div className="grid gap-6 lg:grid-cols-[210px_minmax(0,1fr)] lg:items-start">
            <aside className="rounded-2xl border border-zinc-200/60 bg-white p-5 shadow-[0_8px_30px_rgba(0,0,0,0.02)] lg:sticky lg:top-24">
              <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-400">On this page</p>
              <nav aria-label="Privacy policy sections" className="space-y-1">
                {sections.map((section) => (
                  <a
                    key={section.id}
                    href={`#${section.id}`}
                    className="block rounded-lg px-2.5 py-2 text-xs font-semibold text-zinc-500 transition-colors hover:bg-zinc-50 hover:text-zinc-950"
                  >
                    {section.label}
                  </a>
                ))}
              </nav>
            </aside>

            <article className="rounded-2xl border border-zinc-200/60 bg-white p-6 shadow-[0_8px_30px_rgba(0,0,0,0.02)] sm:p-8">
              <div className="mb-8 flex gap-3 border-b border-zinc-100 pb-6">
                <PackageCheck className="mt-0.5 h-5 w-5 shrink-0 text-zinc-700" />
                <p className="text-sm leading-relaxed text-zinc-600">
                  AZPN Printing HQ provides this tracker so customers can follow custom apparel orders through registration, design, production, stitching, quality checks, and pickup readiness. This notice applies to the tracking page; it sits alongside any privacy information provided when you place an order.
                </p>
              </div>

              <PolicySection id="information" title="Information used" icon={<Eye className="h-4 w-4" />}>
                <p>When you use the tracker, it handles:</p>
                <ul className="list-disc space-y-2 pl-4">
                  <li>The Order ID you enter.</li>
                  <li>Order information returned for display: customer name, order ID, last-updated information, sales contact (PIC), payment status, quantity, material, and production status.</li>
                  <li>Technical request information that the tracking service or its hosting provider may process to deliver and protect the service, such as an IP address, request time, and server logs.</li>
                </ul>
                <p>The page does not ask you to create an account, enter a password, or provide payment card details.</p>
              </PolicySection>

              <PolicySection id="use" title="How information is used" icon={<CheckCircle2 className="h-4 w-4" />}>
                <p>We use the Order ID to find the matching order record and show its progress and related details. Order information is used to support order tracking and the handling of questions about that order.</p>
                <p>When you submit an ID, your browser sends it to the tracking service at <span className="break-all rounded bg-zinc-100 px-1.5 py-0.5 font-mono text-[11px] text-zinc-700">n8n.srv1826674.hstgr.cloud</span>, which returns the order information shown on the page.</p>
              </PolicySection>

              <PolicySection id="sharing" title="Service providers and disclosure" icon={<LockKeyhole className="h-4 w-4" />}>
                <p>Order information is available to the AZPN personnel who handle order tracking and fulfillment. The tracking service and infrastructure providers may process information as needed to operate, host, maintain, and secure the lookup service.</p>
                <p>Information may also be disclosed where required by law or to address a security or service issue. The tracking page is not designed to collect information for advertising.</p>
              </PolicySection>

              <PolicySection id="retention" title="Storage and retention" icon={<Clock3 className="h-4 w-4" />}>
                <p>The tracking page itself does not set a retention period for order records. Order information may remain in AZPN’s order-management records for as long as needed to fulfill the order, provide follow-up support, and meet applicable recordkeeping requirements. Technical logs are handled according to the tracking and hosting providers’ settings.</p>
                <p>For details about a particular order record, contact the AZPN sales PIC who is handling your order.</p>
              </PolicySection>

              <PolicySection id="choices" title="Your choices and requests" icon={<CheckCircle2 className="h-4 w-4" />}>
                <p>You may ask AZPN to confirm, access, or correct personal information associated with your order, or ask for deletion where applicable. Contact the sales PIC for your order using the contact method you already use with AZPN. Include your Order ID so the team can locate the record, but do not send payment card details.</p>
                <p>AZPN may need to verify that you are connected to the order before acting on a request. Some records may need to be kept where applicable legal or business recordkeeping requirements apply.</p>
              </PolicySection>

              <PolicySection id="security" title="Security and updates" icon={<ShieldCheck className="h-4 w-4" />}>
                <p>The page sends lookup requests to the tracking endpoint over HTTPS. The underlying order system and hosting environment are operated through the services used by AZPN. No online service can guarantee that information will be completely secure in every circumstance.</p>
                <p>We may update this notice when the tracker or its data practices change. The date at the top shows when this page was last updated.</p>
              </PolicySection>

              <div className="mt-8 rounded-xl border border-zinc-200/70 bg-zinc-50 p-4 sm:p-5">
                <p className="text-xs leading-relaxed text-zinc-500">
                  For an order-specific privacy question or data request, contact the AZPN sales PIC associated with your order. This page describes the tracking service and does not replace any separate notices or terms provided when placing an order.
                </p>
              </div>
            </article>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-zinc-200/50 bg-white py-6">
        <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 px-6 sm:flex-row">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} AZPN. All rights reserved.</p>
          <a href="/" className="text-xs font-medium text-zinc-400 transition-colors hover:text-zinc-700">Return to order tracking</a>
        </div>
      </footer>
    </div>
  )
}

function PolicySection({ id, title, icon, children }) {
  return (
    <section id={id} className="scroll-mt-24 border-b border-zinc-100 py-6 last:border-b-0 last:pb-0">
      <div className="mb-3 flex items-center gap-2.5">
        <span className="flex h-7 w-7 items-center justify-center rounded-lg bg-zinc-100 text-zinc-700">{icon}</span>
        <h2 className="text-base font-bold tracking-tight text-zinc-950">{title}</h2>
      </div>
      <div className="space-y-3 pl-9 text-sm leading-relaxed text-zinc-600 [&_ul]:my-3">
        {children}
      </div>
    </section>
  )
}

export default PrivacyPolicy
