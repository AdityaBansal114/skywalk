// "use client"

// import { useEffect, useState } from "react"
// import { Check, CreditCard, FileSignature, User } from "lucide-react"

// type StepStatus = "completed" | "current" | "upcoming"

// interface Step {
//   id: number
//   title: string
//   description: string
//   icon: any
//   status: StepStatus
// }

// const initialSteps: Step[] = [
//   {
//     id: 1,
//     title: "User Information & Billing",
//     description: "Provide your personal details and billing information",
//     icon: User,
//     status: "completed",
//   },
//   {
//     id: 2,
//     title: "Payment",
//     description: "Secure payment processing for your subscription",
//     icon: CreditCard,
//     status: "completed",
//   },
//   {
//     id: 3,
//     title: "Signature & Agreement",
//     description: "Digital signature and service agreement generation",
//     icon: FileSignature,
//     status: "upcoming",
//   },
// ]

// export default function TimelinePage() {
//   const [steps, setSteps] = useState<Step[]>(initialSteps)
//   const [loading, setLoading] = useState(true)

//   useEffect(() => {
//     async function fetchSteps() {
//       try {
//         const res = await fetch("/api/progress")
//         const data = await res.json()
//         // Merge backend status into local step config
//         setSteps(prev =>
//           prev.map(step => ({
//             ...step,
//             status: data.steps.find((s: any) => s.id === step.id)?.status || "upcoming",
//           }))
//         )
//       } catch (err) {
//         console.error("Failed to fetch steps:", err)
//       } finally {
//         setLoading(false)
//       }
//     }
//     fetchSteps()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-accent/5 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-foreground mb-4">Service Setup Progress</h1>
//           <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//             Follow these simple steps to complete your furniture touch-up subscription setup
//           </p>
//         </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Vertical line */}
//           <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-border"></div>

//           {loading ? (
//             <p className="text-center text-muted-foreground">Loading progress...</p>
//           ) : (
//             steps.map((step) => {
//               const Icon = step.icon
//               const isCompleted = step.status === "completed"
//               const isCurrent = step.status === "current"
//               const isUpcoming = step.status === "upcoming"

//               return (
//                 <div key={step.id} className="relative flex items-start mb-12 last:mb-0">
//                   {/* Icon container */}
//                   <div
//                     className={`
//                       relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4 
//                       ${
//                         isCompleted
//                           ? "bg-primary border-primary text-primary-foreground"
//                           : isCurrent
//                           ? "bg-accent border-accent text-accent-foreground animate-pulse"
//                           : "bg-muted border-muted-foreground/20 text-muted-foreground"
//                       }
//                     `}
//                   >
//                     {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
//                   </div>

//                   {/* Content */}
//                   <div className="ml-8 flex-1">
//                     <div
//                       className={`
//                         bg-card rounded-lg border p-6 shadow-sm
//                         ${isCurrent ? "ring-2 ring-accent/50 shadow-md" : ""}
//                       `}
//                     >
//                       <div className="flex items-center justify-between mb-3">
//                         <h3
//                           className={`
//                             text-xl font-semibold
//                             ${
//                               isCompleted
//                                 ? "text-primary"
//                                 : isCurrent
//                                 ? "text-accent-foreground"
//                                 : "text-muted-foreground"
//                             }
//                           `}
//                         >
//                           Step {step.id}: {step.title}
//                         </h3>
//                         <span
//                           className={`
//                             px-3 py-1 rounded-full text-sm font-medium
//                             ${
//                               isCompleted
//                                 ? "bg-primary/10 text-primary"
//                                 : isCurrent
//                                 ? "bg-accent/10 text-accent-foreground"
//                                 : "bg-muted text-muted-foreground"
//                             }
//                           `}
//                         >
//                           {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Upcoming"}
//                         </span>
//                       </div>
//                       <p className="text-muted-foreground leading-relaxed">{step.description}</p>

//                       {isCurrent && (
//                         <div className="mt-4 pt-4 border-t">
//                           <button className="bg-accent hover:bg-accent/90 text-accent-foreground px-6 py-2 rounded-md font-medium transition-colors">
//                             Continue Step
//                           </button>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 </div>
//               )
//             })
//           )}
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-12 p-6 bg-card rounded-lg border">
//           <h3 className="text-lg font-semibold text-foreground mb-2">Need Help?</h3>
//           <p className="text-muted-foreground mb-4">
//             Our support team is here to assist you through every step of the process.
//           </p>
//           <button className="bg-primary hover:bg-primary/90 text-primary-foreground px-6 py-2 rounded-md font-medium transition-colors">
//             Contact Support
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }




// import { Check, CreditCard, FileSignature, User } from "lucide-react"
// import { useEffect, useState } from "react"

// type StepStatus = "completed" | "current" | "upcoming"

// interface Step {
//   id: number
//   title: string
//   description: string
//   icon: any
//   status: StepStatus
// }

// export default function TimelinePage() {
//   const [steps, setSteps] = useState<Step[]>([
//     {
//       id: 1,
//       title: "User Information & Billing",
//       description: "Provide your personal details and billing information",
//       icon: User,
//       status: "current",
//     },
//     {
//       id: 2,
//       title: "Payment",
//       description: "Secure payment processing for your subscription",
//       icon: CreditCard,
//       status: "upcoming",
//     },
//     {
//       id: 3,
//       title: "Signature & Agreement",
//       description: "Digital signature and service agreement generation",
//       icon: FileSignature,
//       status: "upcoming",
//     },
//   ])

//   // Fetch step status from backend
//   useEffect(() => {
//     async function fetchStatus() {
//       try {
//         const res = await fetch("/api/steps-status") // <-- replace with your API
//         const data = await res.json()
//         setSteps((prev) =>
//           prev.map((step) => ({
//             ...step,
//             status: data[step.id] || "upcoming", // API returns step status
//           }))
//         )
//       } catch (error) {
//         console.error("Failed to fetch step status:", error)
//       }
//     }

//     fetchStatus()
//   }, [])

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-12 px-4">
//       <div className="max-w-4xl mx-auto">
//         {/* Header */}
//         <div className="text-center mb-12">
//            <h1 className="text-4xl font-bold text-foreground mb-4">Service Setup Progress</h1>
//            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
//              Follow these simple steps to complete your furniture touch-up subscription setup
//            </p>
//            </div>

//         {/* Timeline */}
//         <div className="relative">
//           {/* Vertical line */}
//           <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

//           {steps.map((step) => {
//             const Icon = step.icon
//             const isCompleted = step.status === "completed"
//             const isCurrent = step.status === "current"

//             return (
//               <div key={step.id} className="relative flex items-start mb-12 last:mb-0">
//                 {/* Icon container */}
//                 <div
//                   className={`
//                     relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4
//                     ${
//                       isCompleted
//                         ? "bg-primary-900 border-primary-900 text-white"
//                         : isCurrent
//                         ? "bg-secondary-500 border-secondary-500 text-white animate-pulse"
//                         : "bg-gray-200 border-gray-300 text-gray-500"
//                     }
//                   `}
//                 >
//                   {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
//                 </div>

//                 {/* Content */}
//                 <div className="ml-8 flex-1">
//                   <div
//                     className={`
//                       bg-white rounded-lg border p-6 shadow-sm
//                       ${isCurrent ? "ring-2 ring-secondary-400 shadow-md" : ""}
//                     `}
//                   >
//                     <div className="flex items-center justify-between mb-3">
//                       <h3
//                         className={`
//                           text-xl font-semibold
//                           ${
//                             isCompleted
//                               ? "text-primary-600"
//                               : isCurrent
//                               ? "text-secondary-600"
//                               : "text-gray-500"
//                           }
//                         `}
//                       >
//                         Step {step.id}: {step.title}
//                       </h3>
//                       <span
//                         className={`
//                           px-3 py-1 rounded-full text-sm font-medium
//                           ${
//                             isCompleted
//                               ? "bg-primary-100 text-primary-600"
//                               : isCurrent
//                               ? "bg-secondary-100 text-secondary-700"
//                               : "bg-gray-200 text-gray-500"
//                           }
//                         `}
//                       >
//                         {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Upcoming"}
//                       </span>
//                     </div>
//                     <p className="text-gray-600 leading-relaxed">{step.description}</p>

//                     {isCurrent && (
//                       <div className="mt-4 pt-4 border-t">
//                         <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
//                           Continue Step
//                         </button>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             )
//           })}
//         </div>

//         {/* Footer */}
//         <div className="text-center mt-12 p-6 bg-white rounded-lg border">
//           <h3 className="text-lg font-semibold text-primary-700 mb-2">Need Help?</h3>
//           <p className="text-gray-600 mb-4">
//             Our support team is here to assist you through every step of the process.
//           </p>
//           <button className="bg-primary-900 hover:bg-primary-900 text-white px-6 py-2 rounded-md font-medium transition-colors">
//             Contact Support
//           </button>
//         </div>
//       </div>
//     </div>
//   )
// }






import { Check, CreditCard, FileSignature, User } from "lucide-react"
import { useEffect, useState } from "react"
import Link from "next/link"   // ✅ import link

type StepStatus = "completed" | "current" | "upcoming"

interface Step {
  id: number
  title: string
  description: string
  icon: any
  status: StepStatus
  link: string   // ✅ add link property
}

export default function TimelinePage() {
  const [steps, setSteps] = useState<Step[]>([
    {
      id: 1,
      title: "User Information & Billing",
      description: "Provide your personal details and billing information",
      icon: User,
      status: "current",
      link: "/user/form",   // ✅ page for step 1
    },
    {
      id: 2,
      title: "Payment",
      description: "Secure payment processing for your subscription",
      icon: CreditCard,
      status: "upcoming",
      link: "/user/form",   // ✅ page for step 2
    },
    {
      id: 3,
      title: "Signature & Agreement",
      description: "Digital signature and service agreement generation",
      icon: FileSignature,
      status: "upcoming",
      link: "/user/form",   // ✅ page for step 3
    },
  ])

  // Fetch step status from backend
  useEffect(() => {
    async function fetchStatus() {
      try {
        const res = await fetch("/api/steps-status")
        const data = await res.json()
        setSteps((prev) =>
          prev.map((step) => ({
            ...step,
            status: data[step.id] || "upcoming",
          }))
        )
      } catch (error) {
        console.error("Failed to fetch step status:", error)
      }
    }

    fetchStatus()
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-secondary-50 to-primary-100 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-foreground mb-4">Service Setup Progress</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Follow these simple steps to complete your furniture touch-up subscription setup
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-primary-200"></div>

          {steps.map((step) => {
            const Icon = step.icon
            const isCompleted = step.status === "completed"
            const isCurrent = step.status === "current"

            return (
              <div key={step.id} className="relative flex items-start mb-12 last:mb-0">
                {/* Icon container */}
                <div
                  className={`
                    relative z-10 flex items-center justify-center w-16 h-16 rounded-full border-4
                    ${
                      isCompleted
                        ? "bg-primary-900 border-primary-900 text-white"
                        : isCurrent
                        ? "bg-secondary-500 border-secondary-500 text-white animate-pulse"
                        : "bg-gray-200 border-gray-300 text-gray-500"
                    }
                  `}
                >
                  {isCompleted ? <Check className="w-6 h-6" /> : <Icon className="w-6 h-6" />}
                </div>

                {/* Content */}
                <div className="ml-8 flex-1">
                  <div
                    className={`
                      bg-white rounded-lg border p-6 shadow-sm
                      ${isCurrent ? "ring-2 ring-secondary-400 shadow-md" : ""}
                    `}
                  >
                    <div className="flex items-center justify-between mb-3">
                      <h3
                        className={`
                          text-xl font-semibold
                          ${
                            isCompleted
                              ? "text-primary-600"
                              : isCurrent
                              ? "text-secondary-600"
                              : "text-gray-500"
                          }
                        `}
                      >
                        Step {step.id}: {step.title}
                      </h3>
                      <span
                        className={`
                          px-3 py-1 rounded-full text-sm font-medium
                          ${
                            isCompleted
                              ? "bg-primary-100 text-primary-600"
                              : isCurrent
                              ? "bg-secondary-100 text-secondary-700"
                              : "bg-gray-200 text-gray-500"
                          }
                        `}
                      >
                        {isCompleted ? "Completed" : isCurrent ? "In Progress" : "Upcoming"}
                      </span>
                    </div>
                    <p className="text-gray-600 leading-relaxed">{step.description}</p>

                    {isCurrent && (
                      <div className="mt-4 pt-4 border-t">
                        <Link href={step.link}>
                          <button className="bg-secondary-500 hover:bg-secondary-600 text-white px-6 py-2 rounded-md font-medium transition-colors">
                            Continue Step
                          </button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Footer */}
        <div className="text-center mt-12 p-6 bg-white rounded-lg border">
          <h3 className="text-lg font-semibold text-primary-700 mb-2">Need Help?</h3>
          <p className="text-gray-600 mb-4">
            Our support team is here to assist you through every step of the process.
          </p>
          <button className="bg-primary-900 hover:bg-primary-900 text-white px-6 py-2 rounded-md font-medium transition-colors">
            Contact Support
          </button>
        </div>
      </div>
    </div>
  )
}
