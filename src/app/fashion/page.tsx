import ProcessStep from "./ProcessSteps";

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
            <ProcessStep number={1} title="Flat Sketches">
              I start by creating detailed flat sketches using Adobe
              Illustrator. These sketches act as a blueprint for the entire
              process. They define how the garment&apos;s silhouette should look
              (e.g. whether it should be fitted, loose, or oversized), indicated
              the construction lines (showing exactly where seams and stitching
              will be placed), and include design elements like prints,
              embroidery, pockets, zippers, buttons, and other style details.
            </ProcessStep>
            <ProcessStep number={2} title="3D Modeling & Pattern Drafting">
              Next, I use CLO3D, a 3D modeling application specifically designed
              for the fashion industry. It allows me to draft precise patterns
              and turn them into the exact garment I wish to make. I can then
              simulate the garment as a realistic 3D model on an avatar with my
              own measurements.
              <br />
              <br />
              Since the patterns are made to scale, I can print them on paper
              for cutting fabric later. Doing the pattern drafting digitally
              lets me work much faster than if I had done it on paper with
              pencils and rulers, as I can easily make changes and instantly
              visualize how the garment will fit and drape on my body shape.
            </ProcessStep>
            <ProcessStep number={3} title="Sourcing Materials">
              I can&apos;t begin sewing before I have sourced the materials I
              need, such as fabric, zippers, thread, and other necessary
              supplies. This step, in my opinion, is often the hardest part of
              the process.
              <br />
              <br />
              Finding the right fabric can be a challenge, especially for a
              beginner. Where do I buy from? What is a fair price, so that I
              don&apos;t get ripped off? How do I know if the fabric is of good
              quality?
              <br />
              <br />
              If you live in a city with a fabric store that offers a wide
              selection of fabrics, I suppose this step is much easier than if
              you rely on online marketplaces like I do. Personally, I quite
              like Alibaba because there are so many suppliers to choose from –
              but this can also be overwhelming. I buy samples from suppliers
              and if I like the quality and price, I order the fabric. The
              problem with Alibaba is that suppliers often have quite high MOQs
              (Minimum Order Quanities) and also delivery times is usually about
              a month as they are often based in China. The MOQ can be 1000
              meters, which is of course not feasible for a hobbyist like
              myself. Luckily, it is possible to find suppliers that will work
              with smaller quantities of about 20-50 meters of fabric, which is
              fine for me as I have many projects I work on, but is still quite
              a lot of fabric if you are not serious about sewing.
            </ProcessStep>
            <ProcessStep number={4} title="Garment Construction">
              A nice thing about drafting the patterns in CLO3D is that they can
              be printed to paper and then drawn on to real pattern paper and
              cut out into individual pieces.
            </ProcessStep>
          </div>
        </div>
      </section>

      <section>
        <h1 className="text-center text-5xl font-light">SEWING MACHINES</h1>
      </section>
    </div>
  );
}
