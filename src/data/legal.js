// Textos legales (fuente: Indigoff_Privacy_Policy.pdf e Indigoff_Terms_and_Conditions.pdf, 10 nov 2026).
// Solo en inglés, como los documentos originales. `**texto**` se muestra en negritas y `[texto](/ruta)` como link;
// los correos y teléfonos se convierten en links solos (ver src/pages/Legal/Legal.jsx).
//
// Bloques: { p } párrafo · { note } nota en letra chica · { caps } aviso legal en mayúsculas ·
// { ol } / { ul } listas · { table: { head, rows } } · { callout: [bloques] } recuadro destacado ·
// { address: { name, lines } } datos de contacto.

const UPDATED = "November 10, 2026";
const PHONE = "+1 833-588-4862";
const US = "Indigoff LLC, 108 Main Street, Oceanport, NJ 07757, United States.";
const MX =
  "Indigoff S. de R.L. de C.V., Calle Francisco Petrarca 408, Polanco V Sección, Miguel Hidalgo, Ciudad de México, C.P. 11560, Mexico.";
const addresses = (contactLine) => [
  {
    address: {
      name: "Indigoff LLC",
      lines: ["108 Main Street, Oceanport, NJ 07757, United States", contactLine],
    },
  },
  {
    address: {
      name: "Indigoff S. de R.L. de C.V.",
      lines: ["Calle Francisco Petrarca 408, Polanco V Sección, Miguel Hidalgo, Ciudad de México, C.P. 11560, Mexico"],
    },
  },
];

export const PRIVACY = {
  slug: "privacy-policy",
  title: "Privacy Policy",
  updated: UPDATED,
  sections: [
    {
      id: "who-we-are",
      title: "Who We Are",
      blocks: [
        {
          p: 'This Privacy Policy explains how Indigoff ("Indigoff", "we", "us", or "our") collects, uses, and shares personal data through **indigoff.com** (the "Site") and in the course of its commercial activities, and how you can exercise your privacy rights. The following entities are responsible for your personal data:',
        },
        { p: `**United States:** ${US}` },
        { p: `**Mexico:** ${MX}` },
        { p: `**Privacy Inquiries:** info@indigoff.com | Toll-Free: ${PHONE}` },
        {
          note: "For individuals in Mexico, this document is the Privacy Notice (Aviso de Privacidad) of Indigoff S. de R.L. de C.V. under the Federal Law on Protection of Personal Data Held by Private Parties (LFPDPPP). For individuals in the United States, it describes the rights available under applicable state privacy laws.",
        },
      ],
    },
    {
      id: "information-we-collect",
      title: "Information We Collect",
      blocks: [
        { p: "We collect business contact details and project information. We do not request sensitive personal data." },
        {
          table: {
            head: ["Category", "Examples", "How We Collect It"],
            rows: [
              [
                "Identity and Contact",
                "Name, company, job title, work email, telephone number, city, postal address.",
                "Web forms, email, telephone, trade shows, and meetings.",
              ],
              [
                "Project and Technical Data",
                "Project name and location, drawings, dimensions, acoustic requirements, finish selections.",
                "Quotation and sample requests, acoustic calculations.",
              ],
              [
                "Commercial and Billing",
                "Legal company name, tax ID (EIN, RFC), billing and delivery addresses, purchase orders, transaction history.",
                "Client and distributor onboarding, orders, and invoicing.",
              ],
              [
                "Technical and Browsing",
                "IP address, browser and device type, pages visited, referring source.",
                "Cookies and similar technologies on the Site.",
              ],
              [
                "Communications",
                "Inquiries, support records, communication preferences, consent records.",
                "Email, text messages, messaging applications, and telephone.",
              ],
            ],
          },
        },
        {
          note: "We do not collect or store payment card numbers through the Site. If card payment is offered, it is handled by a third-party payment processor.",
        },
      ],
    },
    {
      id: "how-we-use-your-information",
      title: "How We Use Your Information",
      blocks: [
        { p: "**Primary purposes (necessary for our commercial relationship with you):**" },
        {
          ol: [
            "Responding to inquiries and providing specifications, catalogs, samples, and quotations.",
            "Preparing acoustic calculations, shop drawings, and project proposals.",
            "Processing orders, manufacturing, shipping, installation support, and warranty service.",
            "Invoicing, collections, and compliance with tax, customs, accounting, and other legal obligations.",
            "Protecting the security of the Site and preventing fraud.",
          ],
        },
        { p: "**Secondary purposes (optional):**" },
        {
          ol: [
            "Sending news about products, collections, and completed projects.",
            "Inviting you to events, presentations, and continuing education courses.",
            "Analyzing and improving the Site and our services.",
          ],
        },
        {
          p: "You may opt out of secondary purposes at any time by writing to info@indigoff.com or by using the unsubscribe link in any marketing email. Opting out does not affect the primary purposes.",
        },
        {
          p: "We do not sell personal data for money. We do not use personal data for automated decisions that produce legal effects.",
        },
      ],
    },
    {
      id: "text-messaging",
      title: "Text Messaging (SMS) and Telephone Communications",
      blocks: [
        {
          callout: [
            {
              p: "**No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. All the categories described in this Policy exclude text messaging originator opt-in data and consent; this information will not be shared with, sold, rented, or transferred to any third party.**",
            },
            {
              p: `Indigoff sends text messages related to customer support, quotation follow-up, meeting reminders, production updates, and delivery coordination, and only to people who have expressly opted in. Consent to receive text messages is not a condition of any purchase. Message frequency varies. Message and data rates may apply. Reply **STOP** at any time to cancel, or **HELP** for assistance. You may also contact us at ${PHONE} or info@indigoff.com.`,
            },
          ],
        },
      ],
    },
    {
      id: "cookies",
      title: "Cookies and Similar Technologies",
      blocks: [
        {
          table: {
            head: ["Category", "Purpose", "Your Choice"],
            rows: [
              [
                "Strictly Necessary",
                "Site navigation, security, and form functionality.",
                "Always active; required for the Site to work.",
              ],
              [
                "Analytics",
                "Measuring visits and understanding which content is most useful.",
                "Used only with your consent where the law requires it. You can decline through the cookie notice or your browser settings.",
              ],
              [
                "Advertising",
                "Measuring campaigns and showing relevant professional content on other platforms.",
                "Used only with your consent where the law requires it. You can opt out at any time.",
              ],
            ],
          },
        },
        {
          p: "You can set your browser to block or delete cookies. Where applicable law requires it, we treat a Global Privacy Control signal sent by your browser as a request to opt out of advertising cookies and of any sharing of your personal data for targeted advertising.",
        },
      ],
    },
    {
      id: "sharing",
      title: "Sharing and International Transfers",
      blocks: [
        { p: "We share personal data only as needed for the purposes described above:" },
        {
          ul: [
            "**Indigoff Entities:** Between Indigoff LLC (United States) and Indigoff S. de R.L. de C.V. (Mexico) to coordinate design, production, logistics, and invoicing. Both entities apply this Policy.",
            "**Service Providers:** Companies that work on our behalf and under our instructions, such as hosting, customer management systems, communications, carriers, customs brokers, and installers.",
            "**Authorized Distributors and Representatives:** To deliver samples and provide local support for your project. Where the law requires your consent for this transfer, we will request it. You may object by writing to info@indigoff.com.",
            "**Authorities:** When required by law, court order, or to protect our legal rights.",
            "**Business Transfers:** In connection with a merger, acquisition, or sale of assets, subject to this Policy.",
          ],
        },
        {
          p: "Your data may be processed in the United States and Mexico. Recipients are required to protect it under terms consistent with this Policy.",
        },
      ],
    },
    {
      id: "your-rights",
      title: "Your Rights and How to Exercise Them",
      blocks: [
        {
          table: {
            head: ["Jurisdiction", "Rights", "Response Time"],
            rows: [
              [
                "Mexico (LFPDPPP)",
                "ARCO rights: access, rectification, cancellation, and opposition. You may also revoke your consent and limit the use or disclosure of your data.",
                "We respond within 20 business days and, if the request is granted, implement it within the following 15 business days.",
              ],
              [
                "United States",
                "Depending on your state of residence and whether its law applies to us: the right to know, access, correct, delete, and obtain a copy of your data, and to opt out of targeted advertising, sale of data, or profiling. We will not discriminate against you for exercising these rights.",
                "We respond within 45 days, which may be extended by a further 45 days where reasonably necessary.",
              ],
            ],
          },
        },
        {
          p: "**Submitting a Request:** Write to info@indigoff.com with your full name, contact details, a clear description of the request and the data involved, and a document that allows us to verify your identity or your authority to act for another person. We will use that document only to verify the request.",
        },
        {
          p: "**If You Disagree With Our Response:** You may ask us to reconsider by replying to our decision. In Mexico, you may also file a complaint with the Secretaría Anticorrupción y Buen Gobierno. In the United States, you may contact the Attorney General of your state.",
        },
      ],
    },
    {
      id: "security-and-retention",
      title: "Security and Retention",
      blocks: [
        {
          p: "We apply reasonable administrative, technical, and physical safeguards, including encrypted connections (HTTPS/TLS), access controls, and confidentiality obligations for personnel and service providers. No method of transmission or storage is completely secure, and we cannot guarantee absolute security.",
        },
        {
          p: "We keep personal data for as long as our commercial relationship with you lasts and afterwards for the periods required by applicable tax, accounting, commercial, and warranty obligations. After that, the data is deleted or anonymized.",
        },
      ],
    },
    {
      id: "visitors-from-other-countries",
      title: "Visitors From Other Countries",
      blocks: [
        {
          p: "The Site is operated from the United States and Mexico. If you contact us from the European Economic Area, the United Kingdom, or another country, we process your data to respond to your request, to perform a contract with you, to comply with legal obligations, or on the basis of our legitimate interest in operating our business, and, for marketing, on the basis of your consent. You may exercise the rights granted by your local law by writing to info@indigoff.com.",
        },
      ],
    },
    {
      id: "minors",
      title: "Minors",
      blocks: [
        {
          p: "The Site and our services are directed to businesses and trade professionals. We do not knowingly collect personal data from anyone under 18 years of age. If we learn that we have done so, we will delete it.",
        },
      ],
    },
    {
      id: "changes",
      title: "Changes to This Policy",
      blocks: [
        {
          p: "We may update this Policy. The current version will always be available on the Site, with the date of the last update shown at the top. If a change materially affects how we use your data, we will give notice on the Site or by email.",
        },
      ],
    },
    { id: "contact", title: "Contact Us", blocks: addresses(`Email: info@indigoff.com | Toll-Free: ${PHONE}`) },
  ],
};

export const TERMS = {
  slug: "terms-and-conditions",
  title: "Terms and Conditions",
  updated: UPDATED,
  sections: [
    {
      id: "introduction",
      title: "Introduction and Contracting Parties",
      blocks: [
        {
          p: 'These Terms and Conditions ("Terms") govern access to and use of the website **indigoff.com** (the "Site"), as well as all proposals, sample orders, specifications, quotations, and purchases of architectural acoustic panels, luminaires, and sound-absorbing systems ("Products") supplied by Indigoff.',
        },
        { p: `**United States Operations:** ${US}` },
        { p: `**Mexico Operations:** ${MX}` },
        { p: `**Contact:** info@indigoff.com | Toll-Free: ${PHONE}` },
        {
          note: '"Indigoff", "we", or "us" means the Indigoff entity named on the applicable quotation, order confirmation, or invoice. By using the Site, accepting a quotation, approving a shop drawing, or submitting a purchase order, you ("Client") agree to these Terms.',
        },
      ],
    },
    {
      id: "scope",
      title: "Scope and Order of Precedence",
      blocks: [
        {
          p: "These Terms apply to every sale of Products unless Indigoff and the Client have signed a separate written agreement. If documents conflict, the following order applies: (1) a written agreement signed by both parties, (2) Indigoff's quotation or order confirmation, (3) approved shop drawings, (4) these Terms. Additional or different terms in a Client purchase order or other Client form are rejected unless Indigoff accepts them in writing. Our Products are sold for commercial and professional use.",
        },
      ],
    },
    {
      id: "specifications",
      title: "Specifications, Quotations and Samples",
      blocks: [
        {
          ul: [
            "**Validity of Quotations:** Quotations are valid for thirty (30) calendar days from the date of issue unless stated otherwise in writing. Pricing may be revised if specifications, dimensions, quantities, or site conditions change.",
            "**Acoustic Estimates:** NRC values are based on laboratory testing of the Product. Reverberation time (RT60) calculations and other acoustic recommendations are estimates based on information supplied by the Client. Actual performance on site depends on room geometry, surrounding surfaces, mechanical systems, and installation, and is not guaranteed.",
            "**Samples and Color Variation:** Samples are representative only. Variations in shade, dye lot, texture, and sheen are inherent to PET felt and acoustic textiles and are not defects. Material from different production lots may differ in tone.",
            "**Color Approval:** Where color consistency is critical, the Client must approve a signed physical sample when placing the order. Indigoff will confirm lot availability before production. Orders placed without a signed sample are accepted within normal commercial tolerance.",
            "**Code Compliance and Suitability:** The Client and its design professionals are responsible for confirming that the Products are suitable for the intended application and comply with building, fire, and other codes that apply to the project.",
          ],
        },
      ],
    },
    {
      id: "custom-fabrication",
      title: "Custom Fabrication and Order Confirmation",
      blocks: [
        {
          ul: [
            "**Shop Drawing Approval:** For custom systems, production begins only after Indigoff receives signed shop drawings, written authorization, and any required deposit. The Client is responsible for the accuracy of all approved dimensions and field measurements.",
            "**No Cancellation of Custom Orders:** Custom orders cannot be canceled, changed, or returned once materials have been ordered or cut, or production has started. If Indigoff agrees to a cancellation, the Client will pay for all work completed and materials committed up to that date.",
            "**Change Orders:** Changes requested after drawing approval require a written Change Order stating the additional cost and revised lead time.",
            "**Lead Times:** Production and delivery dates are estimates. Indigoff is not liable for delays or for costs that result from them.",
          ],
        },
      ],
    },
    {
      id: "returns",
      title: "Returns of Standard Products",
      blocks: [
        {
          p: "Standard, non-custom Products may be returned only with Indigoff's prior written authorization, requested within thirty (30) days of delivery. Returned Products must be unused, undamaged, and in their original packaging. Authorized returns are subject to a twenty-five percent (25%) restocking fee, and the Client pays return freight. Custom Products, cut material, and samples are not returnable.",
        },
      ],
    },
    {
      id: "shipping",
      title: "Shipping, Title and Risk of Loss",
      blocks: [
        {
          table: {
            head: ["Topic", "Terms"],
            rows: [
              [
                "Freight Terms",
                "Unless the quotation or invoice states otherwise, shipments within the United States are FOB Origin (shipping point) and cross-border shipments are FCA Indigoff's shipping facility (Incoterms 2020). Risk of loss passes to the Client when the Products are handed to the carrier.",
              ],
              [
                "Title",
                "Title passes to the Client upon payment in full. Until then, Indigoff retains a security interest in the Products to the extent permitted by law.",
              ],
              [
                "Receiving and Unloading",
                "The Client is responsible for dock access, handling equipment, and unloading labor at the delivery location.",
              ],
              [
                "Freight Damage and Claims",
                "The Client must inspect packaging at delivery and note any visible damage on the carrier's delivery receipt. Concealed damage, shortages, or shipping errors must be reported to Indigoff in writing, with photographs, within forty-eight (48) hours of delivery. Claims reported later may be denied.",
              ],
              [
                "Inspection Before Installation",
                "The Client must inspect the Products before installing them. Installation constitutes acceptance of the appearance, color, and dimensions of the Products.",
              ],
              [
                "Storage",
                "If the Client delays delivery after the Products are ready to ship, Indigoff may invoice the order and charge reasonable storage fees.",
              ],
            ],
          },
        },
      ],
    },
    {
      id: "installation",
      title: "Installation",
      blocks: [
        {
          p: "Unless installation is expressly included in the quotation, Indigoff supplies Products only. Indigoff is not responsible for installation performed by the Client or third parties, for substrate or site conditions, or for the use of adhesives, hardware, or methods that Indigoff has not approved in writing.",
        },
      ],
    },
    {
      id: "payment",
      title: "Payment Terms and Taxes",
      blocks: [
        {
          p: "Payment terms are stated on each quotation and invoice. Unless agreed otherwise, orders require a production deposit before scheduling, with the balance due before shipment or under approved credit terms. Past due balances accrue interest at 1.5% per month or the maximum rate permitted by law, whichever is lower. The Client will reimburse reasonable collection costs, including attorneys' fees. The Client is responsible for all applicable sales, use, value-added (IVA), excise, and similar taxes, and for customs duties where applicable. Indigoff may suspend production or delivery while any amount is past due.",
        },
      ],
    },
    {
      id: "warranty",
      title: "Limited Warranty",
      blocks: [
        {
          p: "Indigoff warrants to the original purchaser that its acoustic panels will be free from defects in materials and workmanship for five (5) years from the delivery date, and that lighting, electrical components, and hardware will be free from such defects for one (1) year from the delivery date. The warranty applies only if the Products are stored, acclimatized, installed, and maintained according to Indigoff's written instructions.",
        },
        {
          p: "The warranty does not cover: normal wear; variations in color, shade, or texture described in Section 3; damage caused by improper storage, moisture or humidity extremes, building movement, impact, misuse, unauthorized alteration, or improper cleaning; installation by others; or products not manufactured by Indigoff.",
        },
        {
          p: "**Sole Remedy:** If a Product does not conform to this warranty, Indigoff will, at its option, repair or replace the defective Product or refund its purchase price. This is the Client's sole and exclusive remedy. The warranty does not cover labor, removal, reinstallation, or freight unless Indigoff agrees in writing.",
        },
        {
          caps: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW, THIS LIMITED WARRANTY IS EXCLUSIVE AND INDIGOFF DISCLAIMS ALL OTHER WARRANTIES, EXPRESS OR IMPLIED, INCLUDING THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE.",
        },
      ],
    },
    {
      id: "liability",
      title: "Limitation of Liability",
      blocks: [
        {
          caps: "TO THE MAXIMUM EXTENT PERMITTED BY APPLICABLE LAW: (A) INDIGOFF WILL NOT BE LIABLE FOR INDIRECT, INCIDENTAL, CONSEQUENTIAL, SPECIAL, OR PUNITIVE DAMAGES, INCLUDING LIQUIDATED DAMAGES, DELAY PENALTIES, LOSS OF USE, OR LOST PROFITS, EVEN IF ADVISED OF THEIR POSSIBILITY; AND (B) INDIGOFF'S TOTAL LIABILITY ARISING FROM OR RELATED TO ANY ORDER, WHETHER IN CONTRACT, TORT, OR OTHERWISE, WILL NOT EXCEED THE AMOUNT ACTUALLY PAID TO INDIGOFF FOR THE PRODUCTS THAT GAVE RISE TO THE CLAIM.",
        },
        { p: "Nothing in these Terms limits liability that cannot be limited under applicable law." },
      ],
    },
    {
      id: "force-majeure",
      title: "Force Majeure",
      blocks: [
        {
          p: "Indigoff is not liable for any delay or failure to perform caused by events beyond its reasonable control, including natural disasters, epidemics, labor disputes, shortages of materials or transportation, carrier or customs delays, utility failures, and government action. Delivery dates will be extended for the duration of the event.",
        },
      ],
    },
    {
      id: "intellectual-property",
      title: "Intellectual Property and Design Rights",
      blocks: [
        {
          ul: [
            "**Ownership:** The Site and all Indigoff designs, patterns, profiles, CAD and BIM files, drawings, renderings, photography, technical documents, trademarks, and trade dress belong to Indigoff LLC, its affiliates, or its licensors. This includes the Indigoff name and logo, the names of its collections (Indigoff Air, Skins, Glow, On, Fckoff, Gallery, and Podcaster), and the names of its product models, whether registered or not.",
            "**Limited Use:** Architects, designers, and contractors may use Indigoff materials only to evaluate, specify, and purchase Indigoff Products.",
            "**Prohibited Uses:** No one may copy, reverse engineer, or imitate Indigoff designs, or use Indigoff drawings, images, specifications, or samples to obtain, manufacture, or specify a substitute product from another source.",
            "**Custom Work:** Shop drawings and custom designs prepared by Indigoff remain Indigoff's property. The Client receives a license to use them only for the project for which they were prepared.",
            "**Client Materials:** The Client confirms that it has the right to use any drawings, artwork, or logos it provides to Indigoff, and will be responsible for any third-party claim arising from them.",
          ],
        },
      ],
    },
    {
      id: "text-messaging",
      title: "Text Messaging (SMS) and Telephone Communications",
      blocks: [
        {
          callout: [
            {
              p: "**No mobile information will be shared with third parties or affiliates for marketing or promotional purposes. Text messaging originator opt-in data and consent will not be shared with, sold, rented, or transferred to any third party.**",
            },
            {
              p: "**Program:** Indigoff sends text messages related to customer support, quotation follow-up, meeting reminders, production updates, and delivery coordination.",
            },
            {
              p: "**Consent:** You will receive text messages only if you have expressly opted in, for example by checking the SMS consent box on a form or by texting us first. Consent to receive text messages is not a condition of any purchase.",
            },
            {
              p: "**Frequency and Cost:** Message frequency varies with your project and inquiry activity. Message and data rates may apply.",
            },
            {
              p: `**Opt-Out and Help:** Reply **STOP** at any time to cancel. Reply **HELP** for assistance, or contact us at ${PHONE} or info@indigoff.com. Mobile carriers are not liable for delayed or undelivered messages.`,
            },
            {
              p: "Our use of your information is described in our [Privacy Policy](/privacy-policy). If you contact us by telephone or a messaging application, we may reply through the same channel regarding your inquiry or project.",
            },
          ],
        },
      ],
    },
    {
      id: "use-of-the-site",
      title: "Use of the Site",
      blocks: [
        {
          p: 'The Site is provided for general information, on an "as is" basis. Images, colors, and specifications shown on the Site are illustrative and may change without notice. You agree not to misuse the Site, including by attempting unauthorized access, introducing malicious code, or collecting its content by automated means. Indigoff is not responsible for third-party websites linked from the Site.',
        },
      ],
    },
    {
      id: "governing-law",
      title: "Governing Law and Dispute Resolution",
      blocks: [
        {
          ul: [
            "**Sales by Indigoff LLC:** These Terms and any related sale are governed by the laws of the State of New Jersey, without regard to conflict of law rules. The United Nations Convention on Contracts for the International Sale of Goods does not apply. Any dispute will be resolved exclusively in the state courts located in Monmouth County, New Jersey, or the United States District Court for the District of New Jersey, and each party waives trial by jury to the extent permitted by law.",
            "**Sales by Indigoff S. de R.L. de C.V.:** These Terms and any related sale are governed by the Mexican Commercial Code and other applicable federal laws of Mexico. The parties submit to the competent courts of Mexico City and waive any other jurisdiction that may correspond to them by reason of their present or future domicile.",
          ],
        },
      ],
    },
    {
      id: "general",
      title: "General Provisions",
      blocks: [
        {
          p: "Indigoff may update these Terms by posting a revised version on the Site. The version in effect on the date of the quotation applies to the resulting order. If any provision is held unenforceable, the remaining provisions stay in effect. A failure to enforce a provision is not a waiver. The Client may not assign an order without Indigoff's written consent. These Terms, together with the documents listed in Section 2, are the entire agreement between the parties on their subject matter.",
        },
      ],
    },
    { id: "contact", title: "Contact Information", blocks: addresses(`Phone: ${PHONE} | Email: info@indigoff.com`) },
  ],
};
