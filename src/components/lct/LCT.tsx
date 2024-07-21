'use client'
import React from 'react'
import { disneylandLCTData } from './data'
import { GridPattern } from '../GridPattern'
import {
  type MotionValue,
  motion,
  useMotionTemplate,
  useMotionValue,
} from 'framer-motion'

interface LCTItem {
  title: string
  description: string
}

interface LCTDataProps {
  title: string
  description: string
  necessaryConditions: LCTItem[]
  operationalPractices: LCTItem[]
  typicalFeatures: LCTItem[]
}

const LCTData: React.FC<LCTDataProps> = () => {
  const {
    title,
    description,
    necessaryConditions,
    operationalPractices,
    typicalFeatures,
  } = disneylandLCTData

  let mouseX = useMotionValue(0)
  let mouseY = useMotionValue(0)

  function onMouseMove({
    currentTarget,
    clientX,
    clientY,
  }: React.MouseEvent<HTMLDivElement>) {
    let { left, top } = currentTarget.getBoundingClientRect()
    mouseX.set(clientX - left)
    mouseY.set(clientY - top)
  }

  const renderItems = (items: LCTItem[]) => {
    return items.map((item, index) => (
      <div
        key={index}
        onMouseMove={onMouseMove}
        className="group relative flex rounded-2xl bg-zinc-50 transition-shadow hover:shadow-md hover:shadow-zinc-900/5 dark:bg-white/2.5 dark:hover:shadow-black/5"
      >
        <ResourcePattern
          {...{
            y: 16,
            squares: [
              [0, 1],
              [1, 3],
            ],
          }}
          mouseX={mouseX}
          mouseY={mouseY}
        />
        <div className="absolute inset-0 rounded-2xl ring-1 ring-inset ring-zinc-900/7.5 group-hover:ring-zinc-900/10 dark:ring-white/10 dark:group-hover:ring-white/20" />
        <div className="relative rounded-2xl px-4 pb-0 pt-4">
          <h3 className="mt-1 text-sm font-semibold leading-7 text-zinc-900 dark:text-white">
            <span className="absolute inset-0 rounded-2xl" />
            {item.title}
          </h3>
          <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
            {item.description}
          </p>
        </div>
      </div>
    ))
  }

  return (
    <div className="">
      {/* Title and Description */}
      <div className="mb-6 rounded-lg border p-6 pb-0 backdrop-blur-lg">
        <h1 className="mb-4 text-2xl font-bold">{title}</h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <div className="flex flex-row gap-4 ">
        <div className="basis-1/3 rounded-lg">
          <h2 className="mb-4 text-2xl font-semibold">必要条件</h2>
          <div className="space-y-4">{renderItems(necessaryConditions)}</div>
        </div>

        {/* Operational Practices */}
        <div className="basis-1/3 rounded-lg">
          <h2 className="mb-4 text-2xl font-semibold ">运营惯例</h2>
          <div className="space-y-4">{renderItems(operationalPractices)}</div>
        </div>

        {/* Typical Features */}
        <div className="basis-1/3 rounded-lg">
          <h2 className="mb-4 text-2xl font-semibold">典型特征</h2>
          <div className="space-y-4">{renderItems(typicalFeatures)}</div>
        </div>
      </div>
    </div>
  )
}

export default LCTData

function ResourcePattern({
  mouseX,
  mouseY,
  ...gridProps
}: Omit<
  React.ComponentPropsWithoutRef<typeof GridPattern>,
  'width' | 'height' | 'x'
> & {
  mouseX: MotionValue<number>
  mouseY: MotionValue<number>
}) {
  let maskImage = useMotionTemplate`radial-gradient(180px at ${mouseX}px ${mouseY}px, white, transparent)`
  let style = { maskImage, WebkitMaskImage: maskImage }

  return (
    <div className="pointer-events-none">
      <div className="absolute inset-0 rounded-2xl transition duration-300 [mask-image:linear-gradient(white,transparent)] group-hover:opacity-50">
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/[0.02] stroke-black/5 dark:fill-white/1 dark:stroke-white/2.5"
          {...gridProps}
        />
      </div>
      <motion.div
        className="absolute inset-0 rounded-2xl bg-gradient-to-r from-[#5b41ff]/20 to-[#49d8ff]/20 opacity-0 transition duration-300 group-hover:opacity-100 dark:from-[#5b41ff]/10 dark:to-[#49d8ff]/10"
        style={style}
      />
      <motion.div
        className="absolute inset-0 rounded-2xl opacity-0 mix-blend-overlay transition duration-300 group-hover:opacity-100"
        style={style}
      >
        <GridPattern
          width={72}
          height={56}
          x="50%"
          className="absolute inset-x-0 inset-y-[-30%] h-[160%] w-full skew-y-[-18deg] fill-black/50 stroke-black/70 dark:fill-white/2.5 dark:stroke-white/10"
          {...gridProps}
        />
      </motion.div>
    </div>
  )
}
