export default function FashionPage() {
  return (
    <div>
      <h1 className="text-2xl">Fashion</h1>
      <p className="mt-3">🚧 UNDER CONSTRUCTION 🚧</p>
      <section>
        <h1 className="text-center text-5xl font-light">DESIGNS</h1>
      </section>

      <section>
        <div className="m-auto max-w-2xl">
          <h1 className="text-center text-5xl font-light">PROCESS</h1>
          <p className="mt-4 text-center text-stone-500">
            How I go from idea to a finished garment.
          </p>
          <div className="mt-10 space-y-10">
            <div className="flex gap-2.5">
              <div>
                <div className="flex size-6 items-center justify-center rounded-full bg-gray-600">
                  <p className="text-sm font-bold text-white">1</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold">Flat Sketches</h2>
                <p className="text-sm leading-relaxed text-stone-700">
                  I start by creating detailed flat sketches using Adobe
                  Illustrator. These sketches act as a blueprint for the entire
                  process. They define how the garment&apos;s silhouette should
                  look (e.g. whether it should be fitted, loose, or oversized),
                  indicated the construction lines (showing exactly where seams
                  and stitching will be placed), and include design elements
                  like prints, embroidery, pockets, zippers, buttons, and other
                  style details.
                </p>
              </div>
            </div>
            <div className="flex gap-2.5">
              <div>
                <div className="flex size-6 items-center justify-center rounded-full bg-gray-600">
                  <p className="text-sm font-bold text-white">2</p>
                </div>
              </div>
              <div className="space-y-1.5">
                <h2 className="text-xl font-bold">
                  3D Modeling & Pattern Drafting
                </h2>
                <p className="text-sm leading-relaxed text-stone-700">
                  Next, I use CLO3D, a 3D modeling application specifically
                  designed for the fashion industry. It allows me to draft
                  precise patterns and turn them into the exact garment I wish
                  to make. I can then simulate the garment as a realistic 3D
                  model on an avatar with my own measurements.
                  <br />
                  <br />
                  Since the patterns are made to scale, I can print them on
                  paper for cutting fabric later. Doing the pattern drafting
                  digitally lets me work much faster than if I had done it on
                  paper with pencils and rulers, as I can easily make changes
                  and instantly visualize how the garment will fit and drape on
                  my body shape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
