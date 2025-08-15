// import type { NextPage } from "next"
// import { useState } from "react"
// import Link from "next/link"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Label } from "@/components/ui/label"
// import { Textarea } from "@/components/ui/textarea"
// import { Checkbox } from "@/components/ui/checkbox"
// import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// const UserFormPage: NextPage = () => {
//   const [formData, setFormData] = useState({
//     fullName: "",
//     email: "",
//     phoneNumber: "",
//     address: "",
//     acceptTerms: false,
//   })

//   const handleInputChange = (
//     e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
//   ) => {
//     const { name, value } = e.target
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }))
//   }

//   const handleCheckboxChange = (checked: boolean) => {
//     setFormData((prev) => ({
//       ...prev,
//       acceptTerms: checked,
//     }))
//   }

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault()
//     if (!formData.acceptTerms) {
//       alert("Please accept the terms and conditions to continue.")
//       return
//     }
//     console.log("Form submitted:", formData)
//     // Handle form submission here
//   }

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-background via-muted/30 to-background p-4">
//       <div className="max-w-2xl mx-auto pt-8">
//         {/* Header */}
//         <div className="text-center mb-8">
//           <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-800 rounded-full mb-4">
//             <svg
//               className="w-8 h-8 text-primary-foreground"
//               fill="none"
//               stroke="currentColor"
//               viewBox="0 0 24 24"
//             >
//               <path
//                 strokeLinecap="round"
//                 strokeLinejoin="round"
//                 strokeWidth={2}
//                 d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
//               />
//             </svg>
//           </div>
//           <h1 className="text-3xl font-bold text-foreground mb-2">
//             Premium Furniture Care
//           </h1>
//           <p className="text-muted-foreground text-lg">
//             Join our exclusive restoration subscription service
//           </p>
//         </div>

//         {/* Card with Form */}
//         <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
//           <CardHeader className="bg-gradient-to-r bg-primary-900 from-primary to-primary/90 text-primary-foreground rounded-t-lg">
//             <CardTitle className="text-2xl font-bold flex items-center gap-3">
//               <svg
//                 className="w-6 h-6"
//                 fill="none"
//                 stroke="currentColor"
//                 viewBox="0 0 24 24"
//               >
//                 <path
//                   strokeLinecap="round"
//                   strokeLinejoin="round"
//                   strokeWidth={2}
//                   d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                 />
//               </svg>
//               Get Started Today
//             </CardTitle>
//             <p className="text-primary-foreground/90 mt-2">
//               Tell us about yourself and your furniture care needs
//             </p>
//           </CardHeader>
//           <CardContent className="p-8 space-y-6">
//             <form onSubmit={handleSubmit} className="space-y-6">
//               {/* Full Name + Email */}
//               <div className="grid md:grid-cols-2 gap-6">
//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="fullName"
//                     className="text-foreground font-semibold flex items-center gap-2"
//                   >
//                     <svg
//                       className="w-4 h-4 text-primary"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
//                       />
//                     </svg>
//                     Full Name *
//                   </Label>
//                   <Input
//                     id="fullName"
//                     name="fullName"
//                     type="text"
//                     required
//                     value={formData.fullName}
//                     onChange={handleInputChange}
//                     className="bg-input border-border focus:border-ring focus:ring-ring/20 h-12 text-foreground placeholder:text-muted-foreground"
//                     placeholder="Enter your full name"
//                   />
//                 </div>

//                 <div className="space-y-2">
//                   <Label
//                     htmlFor="email"
//                     className="text-foreground font-semibold flex items-center gap-2"
//                   >
//                     <svg
//                       className="w-4 h-4 text-primary"
//                       fill="none"
//                       stroke="currentColor"
//                       viewBox="0 0 24 24"
//                     >
//                       <path
//                         strokeLinecap="round"
//                         strokeLinejoin="round"
//                         strokeWidth={2}
//                         d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
//                       />
//                     </svg>
//                     Email Address *
//                   </Label>
//                   <Input
//                     id="email"
//                     name="email"
//                     type="email"
//                     required
//                     value={formData.email}
//                     onChange={handleInputChange}
//                     className="bg-input border-border focus:border-ring focus:ring-ring/20 h-12 text-foreground placeholder:text-muted-foreground"
//                     placeholder="Enter your email address"
//                   />
//                 </div>
//               </div>

//               {/* Phone Number */}
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="phoneNumber"
//                   className="text-foreground font-semibold flex items-center gap-2"
//                 >
//                   <svg
//                     className="w-4 h-4 text-primary"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
//                     />
//                   </svg>
//                   Phone Number *
//                 </Label>
//                 <Input
//                   id="phoneNumber"
//                   name="phoneNumber"
//                   type="tel"
//                   required
//                   value={formData.phoneNumber}
//                   onChange={handleInputChange}
//                   className="bg-input border-border focus:border-ring focus:ring-ring/20 h-12 text-foreground placeholder:text-muted-foreground"
//                   placeholder="Enter your phone number"
//                 />
//               </div>

//               {/* Address */}
//               <div className="space-y-2">
//                 <Label
//                   htmlFor="address"
//                   className="text-foreground font-semibold flex items-center gap-2"
//                 >
//                   <svg
//                     className="w-4 h-4 text-primary"
//                     fill="none"
//                     stroke="currentColor"
//                     viewBox="0 0 24 24"
//                   >
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
//                     />
//                     <path
//                       strokeLinecap="round"
//                       strokeLinejoin="round"
//                       strokeWidth={2}
//                       d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
//                     />
//                   </svg>
//                   Service Address *
//                 </Label>
//                 <Textarea
//                   id="address"
//                   name="address"
//                   required
//                   value={formData.address}
//                   onChange={handleInputChange}
//                   className="bg-input border-border focus:border-ring focus:ring-ring/20 min-h-[120px] text-foreground placeholder:text-muted-foreground resize-none"
//                   placeholder="Enter your complete address where furniture restoration services will be provided"
//                 />
//               </div>

//               {/* Checkbox */}
//               <div className="bg-muted/50 p-6 rounded-lg border border-border">
//                 <div className="flex items-start space-x-4">
//                   <Checkbox
//                     id="acceptTerms"
//                     checked={formData.acceptTerms}
//                     onCheckedChange={handleCheckboxChange}
//                     className="mt-1 border-primary data-[state=checked]:bg-primary data-[state=checked]:border-primary"
//                   />
//                   <div className="flex-1">
//                     <Label
//                       htmlFor="acceptTerms"
//                       className="text-foreground cursor-pointer leading-relaxed"
//                     >
//                       I agree to the{" "}
//                       <Link
//                         href="/user/t&c"
//                         className="text-primary hover:text-primary/80 underline font-semibold transition-colors"
//                       >
//                         Terms and Conditions
//                       </Link>{" "}
//                       and understand that my information will be processed
//                       according to our privacy policy. I consent to being
//                       contacted about premium furniture restoration services. *
//                     </Label>
//                   </div>
//                 </div>
//               </div>

//               {/* Submit */}
//               <Button
//                 type="submit"
//                 className="w-full bg-primary-900 hover:bg-primary/90 text-primary-foreground font-bold py-4 h-14 text-lg transition-all duration-200 shadow-lg hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed"
//                 disabled={!formData.acceptTerms}
//               >
//                 <svg
//                   className="w-5 h-5 mr-2"
//                   fill="none"
//                   stroke="currentColor"
//                   viewBox="0 0 24 24"
//                 >
//                   <path
//                     strokeLinecap="round"
//                     strokeLinejoin="round"
//                     strokeWidth={2}
//                     d="M9 12l2 2 4-4m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
//                   />
//                 </svg>
//                 Start My Premium Service
//               </Button>
//             </form>
//           </CardContent>
//         </Card>
//       </div>
//     </div>
//   )
// }

// export default UserFormPage



import type { NextPage } from "next"
import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const UserFormPage: NextPage = () => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber: "",
    address: "",
    acceptTerms: false,
  })

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleCheckboxChange = (checked: boolean) => {
    setFormData((prev) => ({
      ...prev,
      acceptTerms: checked,
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.acceptTerms) {
      alert("Please accept the terms and conditions to continue.")
      return
    }
    console.log("Form submitted:", formData)
    // Handle form submission here
  }

  return (
    <div className="flex flex-col min-h-screen bg-gradient-to-br from-background via-muted/30 to-background">
      <Header />

      {/* Main Content */}
      <main className="flex-grow p-4">
        <div className="max-w-2xl mx-auto pt-8">
          {/* Header Section */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-secondary-800 rounded-full mb-4">
              <svg
                className="w-8 h-8 text-primary-foreground"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z"
                />
              </svg>
            </div>
            <h1 className="text-3xl font-bold text-foreground mb-2">
              Premium Furniture Care
            </h1>
            <p className="text-muted-foreground text-lg">
              Join our exclusive restoration subscription service
            </p>
          </div>

          {/* Card with Form */}
          <Card className="shadow-xl border-0 bg-card/80 backdrop-blur-sm">
            <CardHeader className="bg-gradient-to-r bg-primary-900 from-primary to-primary/90 text-primary-foreground rounded-t-lg">
              <CardTitle className="text-2xl font-bold flex items-center gap-3">
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
                Get Started Today
              </CardTitle>
              <p className="text-primary-foreground/90 mt-2">
                Tell us about yourself and your furniture care needs
              </p>
            </CardHeader>
            <CardContent className="p-8 space-y-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Full Name + Email */}
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label
                      htmlFor="fullName"
                      className="text-foreground font-semibold flex items-center gap-2"
                    >
                      Full Name *
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      required
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-foreground font-semibold flex items-center gap-2"
                    >
                      Email Address *
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="Enter your email address"
                    />
                  </div>
                </div>

                {/* Phone Number */}
                <div className="space-y-2">
                  <Label htmlFor="phoneNumber" className="text-foreground font-semibold">
                    Phone Number *
                  </Label>
                  <Input
                    id="phoneNumber"
                    name="phoneNumber"
                    type="tel"
                    required
                    value={formData.phoneNumber}
                    onChange={handleInputChange}
                    placeholder="Enter your phone number"
                  />
                </div>

                {/* Address */}
                <div className="space-y-2">
                  <Label htmlFor="address" className="text-foreground font-semibold">
                    Service Address *
                  </Label>
                  <Textarea
                    id="address"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="Enter your complete address"
                  />
                </div>

                {/* Checkbox */}
                <div className="bg-muted/50 p-6 rounded-lg border border-border">
                  <div className="flex items-start space-x-4">
                    <Checkbox
                      id="acceptTerms"
                      checked={formData.acceptTerms}
                      onCheckedChange={handleCheckboxChange}
                    />
                    <div className="flex-1">
                      <Label
                        htmlFor="acceptTerms"
                        className="text-foreground cursor-pointer leading-relaxed"
                      >
                        I agree to the{" "}
                        <Link
                          href="/user/t&c"
                          className="text-primary hover:text-primary/80 underline font-semibold transition-colors"
                        >
                          Terms and Conditions
                        </Link>{" "}
                        *
                      </Label>
                    </div>
                  </div>
                </div>

                {/* Submit */}
                <Button
                  type="submit"
                  className="w-full bg-primary-900 hover:bg-primary/90 text-primary-foreground font-bold py-4 h-14 text-lg transition-all duration-200"
                  disabled={!formData.acceptTerms}
                >
                  Start My Premium Service
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  )
}

export default UserFormPage
