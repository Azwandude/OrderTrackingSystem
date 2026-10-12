import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import { Badge } from '@/components/ui/badge'
import { Check, Loader2, Package, Calendar, User, Search, Briefcase, CreditCard, Hash, Layers } from 'lucide-react'

// Order Status Steps definition is handled dynamically inside the App component

function App() {
  const [searchId, setSearchId] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [orderData, setOrderData] = useState(null)
  const [error, setError] = useState('')

  const handleTrack = async (e) => {
    e.preventDefault()
    if (!searchId.trim()) {
      setError('Please enter a valid Order ID')
      return
    }

    setError('')
    setIsLoading(true)

    try {
      const response = await fetch(`https://n8n.srv1826674.hstgr.cloud/webhook/order-status?id=${searchId.trim()}`)
      const data = await response.json()

      if (data.success) {
        setOrderData(data)
      } else {
        setError('Order not found')
        setOrderData(null)
      }
    } catch (err) {
      setError('Network error. Please try again.')
      setOrderData(null)
    } finally {
      setIsLoading(false)
    }
  }

  let activeIndex = -1;
  let isDefect = false;
  let forceComplete = false;

  // New 6-stage pipeline:
  // Customer Registered → Designing → Production → Quality Check → Ready For Pickup
  const dynamicSteps = [
    { label: "Customer Registered", desc: "Your order details have been registered in our system." },
    { label: "Sample", desc: "Our design team is crafting your custom apparel." },
    { label: "Template", desc: "Our design team is using template design for your apparel." },
    { label: "Production", desc: "Your custom apparel is being printed and sublimated." },
    { label: "Stitching", desc: "Your apparel is being stitched and assembled." },
    { label: "Quality Check", desc: "Ensuring your product meets our quality standards." },
    { label: "Ready For Pickup", desc: "Your order is complete and ready for pickup." }
  ];

  if (orderData && orderData.status) {
    const currentStatus = (orderData.status || '').trim().toLowerCase();

    switch (currentStatus) {
      // Stage 1 — Customer Registered
      case 'customer registered':
        activeIndex = 0;
        dynamicSteps[0].label = "Customer Registered";
        break;

      // Stage 2 — Designing
      case 'Sample':
        activeIndex = 1;
        dynamicSteps[1].label = orderData.status.trim();
        break;

      // Stage 3 — Production
      case 'Template':
        activeIndex = 2;
        break;

      // Stage 4 — Stitching
      case 'Production':
        activeIndex = 3;
        break;

       // Stage 4 — Stitching
      case 'Stitching':
        activeIndex = 4;
        break;

      // Defect edge-case (loops back within Production)
      case 'defect':
        activeIndex = 2;
        dynamicSteps[2].label = "Defect";
        dynamicSteps[2].desc = "Quality issue detected. Looping back into production.";
        isDefect = true;
        break;

      // Stage 5 — Quality Check
      case 'quality check':
        activeIndex = 5;
        break;

      // Stage 6 — Ready For Pickup (terminal / completed state)
      case 'ready for pickup':
      case 'pickup':
        activeIndex = 6;
        forceComplete = true;
        break;

      default:
        // Status not recognised — leave activeIndex as -1
        break;
    }

  
  }

  return (
    <div className="min-h-screen bg-zinc-50 text-zinc-950 font-sans antialiased flex flex-col selection:bg-zinc-900 selection:text-white">
      {/* Sleek Top Navigation Bar */}
      <header className="sticky top-0 z-50 w-full border-b border-zinc-200/50 bg-white/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-5xl items-center justify-between px-6">
          {/* Logo Section */}
          <div className="flex items-center gap-3">
            {/* AZPN Logo Circle Badge */}
            <div className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-950 bg-white shadow-[0_1px_3px_rgba(0,0,0,0.05)]">
              <span className="font-sans text-[10px] font-extrabold tracking-tighter text-zinc-950 italic">
                AZPN<span className="not-italic">.</span>
              </span>
            </div>
            {/* Divider */}
            <div className="h-4 w-px bg-zinc-200"></div>
            {/* App Name */}
            <span className="text-base font-bold tracking-tight text-zinc-950">
              AZPNPrinting HQ
            </span>
          </div>

          {/* Navigation Links */}
          <nav className="flex items-center gap-6">
            <a href="#" className="text-xs font-semibold tracking-wide uppercase text-zinc-900 hover:text-zinc-500 transition-colors">
              Track Order
            </a>
          </nav>
        </div>
      </header>

      {/* Main Content Centered */}
      <main className="flex-1 flex flex-col items-center justify-center px-6 py-16 md:py-24 max-w-5xl w-full mx-auto">
        <div className="w-full max-w-4xl space-y-10">

          {/* Hero Header */}
          <div className="space-y-4 text-center">
            <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-zinc-950 leading-none">
              TRACK YOUR ORDER.
            </h1>
            <p className="text-sm md:text-base text-zinc-500 font-medium max-w-md mx-auto leading-relaxed">
              Enter your tracking number below to view the real-time status of your custom sublimated apparel.
            </p>
          </div>

          {/* Tracking Card */}
          <div className="bg-white rounded-2xl border border-zinc-200/60 p-6 md:p-8 shadow-[0_8px_30px_rgba(0,0,0,0.02)] space-y-8">
            {/* Search Form */}
            <form onSubmit={handleTrack} className="space-y-4">
              <div className="space-y-2">
                <label htmlFor="order-id" className="text-[11px] font-bold tracking-wider uppercase text-zinc-400">
                  Order Identification Number
                </label>
                <div className="flex flex-col sm:flex-row gap-3">
                  <div className="relative flex-1">
                    <Input
                      id="order-id"
                      type="text"
                      placeholder="Enter your Order ID (e.g. ORD-12345)"
                      value={searchId}
                      onChange={(e) => {
                        setSearchId(e.target.value.toUpperCase())
                        if (error) setError('')
                      }}
                      className="w-full h-11 px-4 border-zinc-200 focus-visible:ring-zinc-950 focus-visible:border-zinc-950 placeholder:text-zinc-400 text-sm font-medium"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isLoading}
                    className="h-11 px-6 bg-zinc-950 text-white hover:bg-zinc-800 rounded-lg text-xs font-semibold tracking-wide uppercase transition-colors shrink-0 disabled:opacity-80"
                  >
                    {isLoading ? (
                      <>
                        <Loader2 className="mr-2 h-3.5 w-3.5 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      'Track Order'
                    )}
                  </Button>
                </div>
                {error && (
                  <p className="text-xs font-semibold text-red-600 mt-1">{error}</p>
                )}
                {!isLoading && !orderData && !error && (
                  <p className="text-[11px] text-zinc-400 font-medium italic mt-2">
                    Try searching for <span className="font-semibold text-zinc-500 not-italic select-all">ORD-123</span> to view the demo output.
                  </p>
                )}
              </div>
            </form>

            {/* Skeleton Loading State */}
            {isLoading && (
              <div className="space-y-6 pt-4 border-t border-zinc-100 animate-pulse">
                {/* Summary details skeleton */}
                <div className="space-y-5 rounded-xl border border-zinc-100 bg-zinc-50 p-4 sm:p-5">
                  <div className="space-y-2">
                    <Skeleton className="h-3 w-24" />
                    <Skeleton className="h-5 w-2/3" />
                  </div>
                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-zinc-200/70 pt-4 sm:grid-cols-2">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="space-y-2">
                        <Skeleton className="h-3 w-20" />
                        <Skeleton className="h-4 w-28" />
                      </div>
                    ))}
                  </div>
                </div>
                {/* Timeline skeleton */}
                <div className="relative pl-6 space-y-8 pt-4">
                  <div className="absolute left-[9px] top-4 bottom-4 w-0.5 bg-zinc-100"></div>
                  {[1, 2, 3, 4, 5].map((i) => (
                    <div key={i} className="relative flex gap-4">
                      {/* circle */}
                      <div className="absolute -left-[21px] flex h-5 w-5 items-center justify-center">
                        <Skeleton className="h-5 w-5 rounded-full" />
                      </div>
                      <div className="space-y-2 flex-1">
                        <Skeleton className="h-4 w-32" />
                        <Skeleton className="h-3 w-5/6" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tracking Result (Success State) */}
            {!isLoading && orderData && (
              <div className="space-y-8 pt-6 border-t border-zinc-150">

                {/* Summary Info Card */}
                <div className="overflow-hidden rounded-xl border border-zinc-200/50 bg-zinc-50 text-left">
                  <div className="px-4 py-4 sm:px-5">
                    <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                      <User className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                      Customer Name
                    </div>
                    <p className="mt-2 break-words text-base font-semibold leading-relaxed text-zinc-900 [overflow-wrap:anywhere]">
                      {orderData.customer || 'N/A'}
                    </p>
                  </div>

                  <div className="grid grid-cols-1 gap-x-6 gap-y-5 border-t border-zinc-200/70 px-4 py-4 sm:grid-cols-2 sm:px-5">
                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <Package className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        Order ID
                      </div>
                      <p className="break-words text-sm font-semibold leading-snug text-zinc-900 [overflow-wrap:anywhere]">{orderData.orderId || 'N/A'}</p>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <Calendar className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        Last Updated
                      </div>
                      <p className="break-words text-sm font-semibold leading-snug text-zinc-900 [overflow-wrap:anywhere]">{orderData.updated || 'N/A'}</p>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <Briefcase className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        PIC Sales
                      </div>
                      <p className="break-words text-sm font-medium leading-snug text-zinc-900 [overflow-wrap:anywhere]">{orderData.pic || 'N/A'}</p>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <CreditCard className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        Payment
                      </div>
                      <div className="flex min-h-5 items-center">
                        {orderData.payment ? (
                          <p
                            
                            className={(orderData.payment || '').trim().toLowerCase() === 'paid'
                              ? 
                              'text-sm font-semibold leading-snug text-500': 'text-sm font-semibold leading-snug text-500'}
                          >
                            {orderData.payment}
                          </p>
                        ) : (
                          <p className="text-sm font-semibold leading-snug text-zinc-900">N/A</p>
                        )}
                      </div>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <Hash className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        Quantity
                      </div>
                      <p className="break-words text-sm font-semibold leading-snug text-zinc-900 [overflow-wrap:anywhere]">{orderData.quantity || 'N/A'}</p>
                    </div>

                    <div className="flex min-w-0 flex-col gap-1.5">
                      <div className="flex items-center gap-1.5 text-[10px] font-bold uppercase tracking-wider text-zinc-400">
                        <Layers className="h-3.5 w-3.5 shrink-0 text-zinc-400" />
                        Material
                      </div>
                      <p className="break-words text-sm font-semibold leading-snug text-zinc-900 [overflow-wrap:anywhere]">{orderData.material || orderData.Material || 'N/A'}</p>
                    </div>
                  </div>
                </div>
                {/* Timeline Stepper */}
                <div className="relative pl-7 text-left">
                  <div className="flex flex-col">
                    {dynamicSteps.map((step, idx) => {
                      let isCompleted = idx < activeIndex;
                      let isActive = idx === activeIndex;
                      let isPending = idx > activeIndex;

                      // If the order is fully finished, mark the final step as completed (checkmark) instead of active (blipping)
                      if (forceComplete && idx <= activeIndex) {
                        isCompleted = true;
                        isActive = false;
                        isPending = false;
                      }

                      return (
                        <div key={idx} className={`relative flex gap-4 ${idx !== dynamicSteps.length - 1 ? 'pb-8' : ''}`}>
                          {/* Step track line segment connecting to next step */}
                          {idx !== dynamicSteps.length - 1 && (
                            <div className="absolute -left-[19px] top-6 bottom-0 w-[2px] bg-zinc-200"></div>
                          )}

                          {/* Stepper node circle */}
                          <div className="absolute -left-[23px] flex h-5 w-5 items-center justify-center z-10">
                            {isCompleted && (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_0_0_3px_rgba(255,255,255,1)]">
                                <Check className="h-3 w-3 stroke-[3]" />
                              </div>
                            )}

                            {isActive && !isDefect && (
                              <div className="relative flex h-5 w-5 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-zinc-950/20 opacity-75"></span>
                                <div className="relative flex h-4.5 w-4.5 items-center justify-center rounded-full bg-zinc-950 text-white shadow-[0_0_0_3px_rgba(255,255,255,1)]">
                                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                                </div>
                              </div>
                            )}

                            {isActive && isDefect && (
                              <div className="relative flex h-5 w-5 items-center justify-center">
                                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-600/30 opacity-75"></span>
                                <div className="relative flex h-4.5 w-4.5 items-center justify-center rounded-full bg-red-600 text-white shadow-[0_0_0_3px_rgba(255,255,255,1)]">
                                  <div className="h-1.5 w-1.5 rounded-full bg-white animate-pulse"></div>
                                </div>
                              </div>
                            )}

                            {isPending && (
                              <div className="flex h-5 w-5 items-center justify-center rounded-full border-2 border-zinc-200 bg-white shadow-[0_0_0_3px_rgba(255,255,255,1)]">
                                <div className="h-1.5 w-1.5 rounded-full bg-transparent"></div>
                              </div>
                            )}
                          </div>

                          {/* Content */}
                          <div className="space-y-1 pl-1">
                            <h3 className={`text-sm font-bold tracking-tight transition-colors ${isActive && isDefect ? 'text-red-600' :
                              isActive ? 'text-zinc-950' :
                                isCompleted ? 'text-zinc-800' : 'text-zinc-400'
                              }`}>
                              {step.label}
                              {isActive && (
                                <span className={`ml-2 inline-flex items-center rounded-full px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${isDefect ? 'bg-red-100 text-red-700' : 'bg-zinc-100 text-zinc-800'}`}>
                                  {isDefect ? 'Issue' : 'Active'}
                                </span>
                              )}
                            </h3>
                            <p className={`text-xs leading-relaxed transition-colors ${isActive && isDefect ? 'text-red-500 font-medium' :
                              isActive ? 'text-zinc-650' :
                                isCompleted ? 'text-zinc-500' : 'text-zinc-350'
                              }`}>
                              {step.desc}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>

              </div>
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-zinc-200/50 py-8 bg-white mt-auto">
        <div className="mx-auto max-w-5xl px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-xs text-zinc-400">
            © {new Date().getFullYear()} AZPN. All rights reserved.
          </p>
          <div className="flex gap-6">
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600">Privacy Policy</a>
            <a href="#" className="text-xs text-zinc-400 hover:text-zinc-600">Terms of Service</a>
          </div>
        </div>
      </footer>
    </div>
  )
}

export default App
