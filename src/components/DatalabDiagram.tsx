export type DatalabDiagramProps = {
  debug?: boolean
  height?: number
}
const DatalabDiagram: React.FC<DatalabDiagramProps> = ({
  debug = false,
  height = 500,
}) => {
  if (debug) {
    console.log("DatalabDiagram.render")
  }
  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1603.05"
      height={height}
      viewBox="0 0 1603.05 761.31"
    >
      <defs>
        <radialGradient
          id="radial-gradient"
          cx="112.49"
          cy="708.41"
          fx="112.49"
          fy="708.41"
          r="1020.97"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0" stop-color="#f2994a" />
          <stop offset="1" stop-color="#fafbf2" />
        </radialGradient>
      </defs>
      <rect
        width="1603.05"
        height="761.31"
        rx="54.44"
        ry="54.44"
        fill="#fafbf2"
      />
      <rect
        width="1603.05"
        height="761.31"
        rx="54.44"
        ry="54.44"
        fill="url(#radial-gradient)"
        opacity=".2"
      />
      <g>
        <text transform="translate(120.74 69.5)">
          <tspan className="font-weight-bold">Backend</tspan>
          <tspan className="small-caps">
            <tspan x="-45.32" y="18.23">
              (slr, MySQL, Image server)
            </tspan>
          </tspan>
        </text>
        <text
          transform="translate(833.35 328.41) rotate(-90)"
          className="small-caps"
          font-size="15.19"
        >
          <tspan x="0" y="0">
            USES
          </tspan>
        </text>
        <text
          transform="translate(833.35 526.73) rotate(-90)"
          className="small-caps"
          font-size="15.19"
        >
          <tspan x="0" y="0">
            USES
          </tspan>
        </text>
        <text
          transform="translate(1522.65 294.95) rotate(90)"
          font-size="61.74"
          font-weight="300"
          opacity=".15"
        >
          <tspan x="0" y="0">
            User
          </tspan>
        </text>
        <text transform="translate(640 70.77)" text-anchor="middle">
          <tspan className="font-weight-bold h5">
            <a
              href="https://github.com/impresso/impresso-middle-layer"
              title="Browse code on GitHub"
            >
              Impresso Middle Layer
            </a>
          </tspan>
          <tspan className="small-caps">
            <tspan x="0" y="18.23">
              internal API
            </tspan>
          </tspan>
        </text>
        <text
          transform="translate(604.95 167.57)"
          font-family="Satoshi-VariableItalic"
          font-size="15.19"
          font-style="italic"
        >
          <tspan x="0" y="0">
            derives from
          </tspan>
          <tspan x="-14.67" y="18.23">
            (same codebase)
          </tspan>
        </text>
        <text
          transform="translate(331.77 167.57)"
          font-family="Satoshi-VariableItalic"
        >
          <tspan x="0" y="0">
            image uploads, query
          </tspan>
          <tspan x="29.83" y="18.23">
            embeddings
          </tspan>
        </text>
        <text
          transform="translate(307.52 278.91)"
          font-family="Satoshi-VariableItalic"
        >
          <tspan x="0" y="0">
            The Public API seats in front of
          </tspan>
          <tspan x="33.17" y="28">
            the Ann
          </tspan>
          <tspan x="84.27" y="28" letter-spacing="0em">
            o
          </tspan>
          <tspan x="92.65" y="28" letter-spacing="0em">
            t
          </tspan>
          <tspan x="96.95" y="28" letter-spacing="0em">
            a
          </tspan>
          <tspan x="104.61" y="28" letter-spacing="0em">
            tion API
          </tspan>
        </text>
        <text
          transform="translate(160 282.68)"
          text-anchor="middle"
          className="font-weight-bold"
        >
          <tspan x="0" y="0">
            Impresso Annotation
          </tspan>
          <tspan x="0" y="18.23" className="small-caps">
            Services - via API
          </tspan>
        </text>
        <text transform="translate(160 498.18)" text-anchor="middle">
          <tspan x="0" y="0" className="font-weight-bold h5">
            Impresso Annotation
          </tspan>
          <tspan x="0" y="18.23" className="small-caps">
            Services - backend
          </tspan>
        </text>
        <g>
          <text
            transform="translate(1288.47 407.74)"
            font-family="Satoshi-VariableItalic"
            font-size="15.19"
            font-style="italic"
          >
            <tspan x="0" y="0">
              An ent
            </tspan>
            <tspan x="42.73" y="0" letter-spacing=".01em">
              r
            </tspan>
            <tspan x="48.09" y="0">
              y point{" "}
            </tspan>
            <tspan x="96.46" y="0" letter-spacing="0em">
              t
            </tspan>
            <tspan x="100.8" y="0">
              o
            </tspan>
            <tspan x="0" y="18.23">
              the eco
            </tspan>
            <tspan x="48.82" y="18.23" letter-spacing="-.02em">
              s
            </tspan>
            <tspan x="54.96" y="18.23" letter-spacing="0em">
              y
            </tspan>
            <tspan x="62.04" y="18.23" letter-spacing="-.03em">
              s
            </tspan>
            <tspan x="68.08" y="18.23" letter-spacing="0em">
              t
            </tspan>
            <tspan x="72.43" y="18.23">
              em
            </tspan>
          </text>
          <g>
            <g>
              <rect
                x="1223.8"
                y="321.11"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <path d="M1242.05,326.53c-7.09,0-12.84,5.75-12.84,12.84s5.75,12.84,12.84,12.84,12.84-5.75,12.84-12.84c0-7.09-5.75-12.83-12.84-12.84M1252.32,334.58h-5.08c-.61-2.33-1.71-4.51-3.24-6.38,3.65.64,6.75,3.02,8.32,6.38M1253.38,339.37c0,1.11-.16,2.21-.48,3.27h-5.33c.37-2.17.37-4.38,0-6.54h5.33c.32,1.06.48,2.16.48,3.27M1242.05,350.42c-.73-.74-1.37-1.56-1.91-2.45-.73-1.19-1.3-2.48-1.69-3.82h7.21c-.39,1.34-.96,2.63-1.69,3.82-.54.88-1.18,1.71-1.91,2.45M1238.08,342.64c-.41-2.16-.41-4.38,0-6.54h7.94c.41,2.16.41,4.38,0,6.54h-7.94ZM1230.73,339.37c0-1.11.16-2.21.48-3.27h5.33c-.37,2.17-.37,4.38,0,6.54h-5.33c-.32-1.06-.48-2.16-.48-3.27M1242.05,328.31c.73.74,1.37,1.56,1.91,2.45.73,1.19,1.3,2.48,1.69,3.82h-7.21c.39-1.34.96-2.63,1.69-3.82.54-.88,1.18-1.71,1.91-2.45M1240.11,328.21c-1.53,1.87-2.63,4.04-3.24,6.38h-5.08c1.57-3.35,4.67-5.73,8.32-6.38M1231.79,344.15h5.08c.61,2.33,1.71,4.51,3.24,6.38-3.65-.64-6.75-3.02-8.32-6.38M1243.99,350.52c1.53-1.87,2.63-4.04,3.24-6.38h5.08c-1.57,3.35-4.67,5.73-8.32,6.38h0Z" />
            </g>
            <text
              transform="translate(1267.59 345.06)"
              className="font-weight-bold h5"
            >
              <a href="https://github.com/impresso/impresso-datalab">
                Impresso Datalab Website
              </a>
            </text>
          </g>
          <polyline
            points="1241.96 357.62 1241.96 462.37 1485.63 462.37 1485.63 357.62 1269.25 357.62 1269.25 376.45 1476.26 376.45 1476.26 453.14 1269.25 453.14 1269.25 376.45"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="1.04"
          />
          <g>
            <circle
              cx="1298.08"
              cy="367.41"
              r="3.39"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.04"
            />
            <circle
              cx="1288.47"
              cy="367.41"
              r="3.39"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.04"
            />
            <circle
              cx="1278.86"
              cy="367.41"
              r="3.39"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.04"
            />
          </g>
        </g>
        <g>
          <g>
            <text
              transform="translate(1268.1 78.78)"
              className="font-weight-bold h5"
            >
              <a href="https://github.com/impresso/impresso-frontend">
                Impresso App Website
              </a>
            </text>
            <g>
              <rect
                x="1223.8"
                y="55.64"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <path d="M1242.05,61.06c-7.09,0-12.84,5.75-12.84,12.84s5.75,12.84,12.84,12.84,12.84-5.75,12.84-12.84c0-7.09-5.75-12.83-12.84-12.84M1252.32,69.12h-5.08c-.61-2.33-1.71-4.51-3.24-6.38,3.65.64,6.75,3.02,8.32,6.38M1253.38,73.9c0,1.11-.16,2.21-.48,3.27h-5.33c.37-2.17.37-4.38,0-6.54h5.33c.32,1.06.48,2.16.48,3.27M1242.05,84.95c-.73-.74-1.37-1.56-1.91-2.45-.73-1.19-1.3-2.48-1.69-3.82h7.21c-.39,1.34-.96,2.63-1.69,3.82-.54.88-1.18,1.71-1.91,2.45M1238.08,77.17c-.41-2.16-.41-4.38,0-6.54h7.94c.41,2.16.41,4.38,0,6.54h-7.94ZM1230.73,73.9c0-1.11.16-2.21.48-3.27h5.33c-.37,2.17-.37,4.38,0,6.54h-5.33c-.32-1.06-.48-2.16-.48-3.27M1242.05,62.85c.73.74,1.37,1.56,1.91,2.45.73,1.19,1.3,2.48,1.69,3.82h-7.21c.39-1.34.96-2.63,1.69-3.82.54-.88,1.18-1.71,1.91-2.45M1240.11,62.74c-1.53,1.87-2.63,4.04-3.24,6.38h-5.08c1.57-3.35,4.67-5.73,8.32-6.38M1231.79,78.68h5.08c.61,2.33,1.71,4.51,3.24,6.38-3.65-.64-6.75-3.02-8.32-6.38M1243.99,85.06c1.53-1.87,2.63-4.04,3.24-6.38h5.08c-1.57,3.35-4.67,5.73-8.32,6.38h0Z" />
            </g>
          </g>
          <polyline
            points="1242.05 92.16 1242.05 196.9 1485.72 196.9 1485.72 92.16 1269.34 92.16 1269.34 110.98 1476.36 110.98 1476.36 187.68 1269.34 187.68 1269.34 110.98"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="1.04"
          />
          <g>
            <circle
              cx="1298.18"
              cy="101.94"
              r="3.39"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.04"
            />
            <circle
              cx="1288.57"
              cy="101.94"
              r="3.39"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.04"
            />
            <circle
              cx="1278.96"
              cy="101.94"
              r="3.39"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.04"
            />
          </g>
        </g>
        <g>
          <text transform="translate(569.3 303.33)" font-size="15.19">
            <tspan x="0" y="0" className="small-caps">
              API time-limited token
            </tspan>
          </text>
          <text
            transform="translate(563.1 282.68)"
            font-family="Satoshi-Variable"
            font-size="15.19"
            font-weight="700"
          >
            <tspan x="0" y="0">
              IMPRE
            </tspan>
            <tspan x="46.73" y="0" letter-spacing="0em">
              S
            </tspan>
            <tspan x="55.82" y="0">
              SO PUBLIC API
            </tspan>
          </text>
          <g>
            <rect
              x="626.95"
              y="322.42"
              width="36.51"
              height="36.51"
              rx="18.26"
              ry="18.26"
              fill="#ffeb78"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.26"
            />
            <line
              x1="633.69"
              y1="340.68"
              x2="629.18"
              y2="340.68"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="633.69"
              y1="337.06"
              x2="630.86"
              y2="337.06"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="633.69"
              y1="344.3"
              x2="630.86"
              y2="344.3"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="633.69"
              y1="340.68"
              x2="629.18"
              y2="340.68"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="633.69"
              y1="344.3"
              x2="630.86"
              y2="344.3"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="633.69"
              y1="337.06"
              x2="630.86"
              y2="337.06"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <path
              d="M643.42,334.38h3.57c1.11,0,2.02.9,2.02,2.02,0,0,0,0,0,0v2.62c0,1.11-.9,2.02-2.02,2.02h-.3v6.5c0,.33-.12.65-.33.9l-.08.09-.58.58c-.25.25-.65.27-.93.05l-.06-.05-.58-.58c-.23-.23-.38-.54-.4-.87v-.12s0-.41,0-.41l.99-.99-.99-.99.99-.99-.99-.99v-2.12h-.3c-1.11,0-2.02-.9-2.02-2.02,0,0,0,0,0,0v-2.62c0-1.11.9-2.02,2.02-2.02,0,0,0,0,0,0M645.21,337.71h0"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.44"
            />
            <line
              x1="656.72"
              y1="340.68"
              x2="661.24"
              y2="340.68"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="656.72"
              y1="344.3"
              x2="659.55"
              y2="344.3"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <line
              x1="656.72"
              y1="337.06"
              x2="659.55"
              y2="337.06"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <path
              d="M650.76,350.77c3.55-1.96,5.96-5.74,5.96-10.09s-2.41-8.13-5.96-10.09"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
            <path
              d="M639.65,330.59c-3.55,1.96-5.96,5.74-5.96,10.09s2.41,8.13,5.96,10.09"
              fill="none"
              stroke="#000"
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="1.39"
            />
          </g>
          <polyline
            points="726.34 302.75 726.34 310.53 564.08 310.53 564.08 302.75"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="1.26"
          />
        </g>
        <line
          x1="645.21"
          y1="310.53"
          x2="645.21"
          y2="322.42"
          fill="none"
          stroke="#000"
          stroke-miterlimit="10"
          stroke-width="1.26"
        />
        <line
          x1="268.7"
          y1="73.9"
          x2="545.47"
          y2="73.9"
          fill="none"
          stroke="#b0b3b7"
          stroke-miterlimit="10"
        />
        <line
          x1="751.76"
          y1="73.9"
          x2="1223.8"
          y2="73.9"
          fill="none"
          stroke="#b0b3b7"
          stroke-miterlimit="10"
        />
        <path
          d="M663.46,340.68h73.42c31.21,0,56.51-25.3,56.51-56.51v-78.35c0-31.21,25.3-56.51,56.51-56.51h23.74"
          fill="none"
          stroke="#b0b3b7"
          stroke-miterlimit="10"
        />
        <g>
          <path
            d="M884.76,215.92c-24.49,3.48-43.32,24.53-43.32,49.99v88.64c0,27.88,22.61,50.49,50.49,50.49h0"
            fill="none"
            stroke="#b0b3b7"
            stroke-miterlimit="10"
          />
          <polygon
            points="882.89 211.21 891.93 215.42 883.77 221.15 882.89 211.21"
            fill="#b0b3b7"
          />
        </g>
        <g>
          <path
            d="M884.76,405.55c-24.49,3.48-43.32,24.53-43.32,49.99v106.03c0,27.88,22.61,50.49,50.49,50.49h0"
            fill="none"
            stroke="#b0b3b7"
            stroke-miterlimit="10"
          />
          <polygon
            points="882.89 400.84 891.93 405.04 883.77 410.77 882.89 400.84"
            fill="#b0b3b7"
          />
        </g>
        <path
          d="M1154.11,215.42h0c27.88,0,50.49,22.61,50.49,50.49v109.4c0,12.39,4.96,24.26,13.77,32.97h0s0,0,0,0c-8.81,8.71-13.77,20.58-13.77,32.97v120.32c0,27.88-22.61,50.49-50.49,50.49h0"
          fill="none"
          stroke="#b0b3b7"
          stroke-miterlimit="10"
        />
        <line
          x1="641.41"
          y1="103.07"
          x2="641.41"
          y2="144.53"
          fill="none"
          opacity=".3"
          stroke="#000"
          stroke-miterlimit="10"
          stroke-width="1.26"
        />
        <g>
          <line
            x1="641.41"
            y1="248.93"
            x2="641.41"
            y2="202.67"
            fill="none"
            stroke="#b0b3b7"
            stroke-miterlimit="10"
          />
          <polygon
            points="646.39 247.47 641.41 256.1 636.42 247.47 646.39 247.47"
            fill="#b0b3b7"
          />
        </g>
        <g>
          <line
            x1="275.87"
            y1="288.35"
            x2="538.52"
            y2="288.35"
            fill="none"
            stroke="#b0b3b7"
            stroke-miterlimit="10"
          />
          <polygon
            points="277.33 293.33 268.7 288.35 277.33 283.36 277.33 293.33"
            fill="#b0b3b7"
          />
        </g>
        <g>
          <line
            x1="360.38"
            y1="206.35"
            x2="277.5"
            y2="252.6"
            fill="none"
            stroke="#b0b3b7"
            stroke-miterlimit="10"
          />
          <polygon
            points="276.34 247.54 271.23 256.1 281.2 256.25 276.34 247.54"
            fill="#b0b3b7"
          />
        </g>
        <line
          x1="545.47"
          y1="103.07"
          x2="474.05"
          y2="142.92"
          fill="none"
          stroke="#b0b3b7"
          stroke-miterlimit="10"
        />
        <g>
          <g>
            <text transform="translate(961.82 194.49)">
              <tspan x="0" y="0" className="font-style-italic">
                Available on PyPi
              </tspan>
              <tspan x="0" y="15">
                pip install impresso
              </tspan>
            </text>
            <g opacity=".5">
              <rect
                x="916.8"
                y="178.91"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <path d="M946.43,194.24c-.41-1.63-1.18-2.86-2.81-2.86h-2.11v2.5c0,1.94-1.64,3.57-3.52,3.57h-5.63c-1.54,0-2.81,1.32-2.81,2.86v5.37c0,1.53,1.33,2.42,2.81,2.86,1.78.52,3.49.62,5.63,0,1.42-.41,2.81-1.24,2.81-2.86v-2.15h-5.62v-.72h8.44c1.64,0,2.25-1.14,2.81-2.86.59-1.77.56-3.46,0-5.72h0ZM938.33,204.96c.59,0,1.06.48,1.06,1.07s-.47,1.08-1.06,1.08-1.06-.48-1.06-1.08c0-.6.48-1.07,1.06-1.07ZM932.09,196.75h5.63c1.57,0,2.81-1.29,2.81-2.86v-5.37c0-1.53-1.29-2.67-2.81-2.93-1.89-.31-3.94-.3-5.63,0-2.38.42-2.81,1.3-2.81,2.93v2.15h5.63v.72h-7.75c-1.64,0-3.07.99-3.52,2.86-.52,2.15-.54,3.48,0,5.72.4,1.67,1.35,2.86,2.99,2.86h1.93v-2.57c0-1.86,1.61-3.5,3.52-3.5h0ZM931.74,189.23c-.59,0-1.06-.48-1.06-1.07,0-.6.47-1.08,1.06-1.08s1.06.48,1.06,1.08-.47,1.07-1.06,1.07Z" />
            </g>
          </g>
          <g>
            <text
              transform="translate(961.82 238.99)"
              font-family="Satoshi-VariableItalic"
              font-size="15.19"
              font-style="italic"
            >
              <tspan x="0" y="0">
                Documen
              </tspan>
              <tspan x="63.81" y="0" letter-spacing="0em">
                t
              </tspan>
              <tspan x="68.16" y="0">
                ed on{" "}
              </tspan>
              <tspan x="109.81" y="0" letter-spacing="-.03em">
                R
              </tspan>
              <tspan x="118.77" y="0" letter-spacing="0em">
                e
              </tspan>
              <tspan x="126.55" y="0" letter-spacing="0em">
                ad{" "}
              </tspan>
              <tspan x="0" y="15">
                the Doc
              </tspan>
            </text>
            <g opacity=".5">
              <rect
                x="916.8"
                y="223.41"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <g>
                <path d="M943.03,236.15l-5.76-5.76c-.16-.16-.33-.25-.58-.25h-8.22c-.9,0-1.64.74-1.64,1.64v19.74c0,.9.74,1.64,1.64,1.64h13.16c.9,0,1.64-.74,1.64-1.64v-14.8c0-.25-.08-.41-.25-.58M936.7,232.12l4.61,4.61h-4.61v-4.61ZM941.63,251.53h-13.16v-19.74h6.58v4.93c0,.9.74,1.64,1.64,1.64h4.93v13.16Z" />
                <path d="M930.12,245.17h9.87v1.64h-9.87v-1.64ZM930.12,241.66h9.87v1.64h-9.87v-1.64Z" />
              </g>
            </g>
          </g>
          <g>
            <text
              transform="translate(918.09 155.15)"
              className="font-weight-bold h5"
            >
              <a href="http://github.com/impresso/impresso-py">
                Impresso Python Library
              </a>
            </text>
            <g>
              <rect
                x="873.65"
                y="131.06"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <path d="M905.6,149.31l-6.39,6.39-1.29-1.29,5.1-5.11-5.1-5.11,1.29-1.29,6.39,6.39ZM878.21,149.31l6.39-6.39,1.29,1.29-5.1,5.11,5.1,5.11-1.29,1.29-6.39-6.39ZM888.64,157.97l4.77-17.79,1.76.47-4.77,17.79-1.76-.47Z" />
            </g>
          </g>
          <polyline
            points="891.9 167.57 891.9 271.26 1152.91 271.26 1152.91 166.55 919.37 166.55"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="1.26"
          />
        </g>
        <g>
          <text
            transform="translate(919.13 605.73)"
            font-family="Satoshi-VariableItalic"
            font-size="15.19"
            font-style="italic"
          >
            <tspan x="0" y="0">
              Models (with model ca
            </tspan>
            <tspan x="146.77" y="0" letter-spacing="-.02em">
              r
            </tspan>
            <tspan x="151.61" y="0">
              ds)
            </tspan>
            <tspan x="0" y="18.23">
              D
            </tspan>
            <tspan x="10.6" y="18.23" letter-spacing="0em">
              a
            </tspan>
            <tspan x="18.26" y="18.23" letter-spacing="0em">
              t
            </tspan>
            <tspan x="22.56" y="18.23">
              as
            </tspan>
            <tspan x="36.79" y="18.23" letter-spacing="0em">
              e
            </tspan>
            <tspan x="44.57" y="18.23" letter-spacing="0em">
              t
            </tspan>
            <tspan x="49.02" y="18.23">
              s (with ca
            </tspan>
            <tspan x="109.96" y="18.23" letter-spacing="-.02em">
              r
            </tspan>
            <tspan x="114.81" y="18.23">
              ds)
            </tspan>
            <tspan x="0" y="36.46">
              Spaces
            </tspan>
          </text>
          <text
            transform="translate(891.9 690.36)"
            font-family="Satoshi-VariableItalic"
            font-size="15.19"
            font-style="italic"
          >
            <tspan x="0" y="0">
              D
            </tspan>
            <tspan x="10.6" y="0" letter-spacing="-.02em">
              o
            </tspan>
            <tspan x="18.73" y="0">
              wnloadable and{" "}
            </tspan>
            <tspan x="127.11" y="0" letter-spacing="-.02em">
              ex
            </tspan>
            <tspan x="141.18" y="0" letter-spacing="0em">
              ecu
            </tspan>
            <tspan x="165" y="0" letter-spacing="0em">
              t
            </tspan>
            <tspan x="169.29" y="0" letter-spacing="0em">
              able locally
            </tspan>
            <tspan x="0" y="18.23" letter-spacing="0em">
              U
            </tspan>
            <tspan x="10.33" y="18.23">
              sage demo
            </tspan>
            <tspan x="82.8" y="18.23" letter-spacing="0em">
              n
            </tspan>
            <tspan x="91.08" y="18.23" letter-spacing="-.03em">
              s
            </tspan>
            <tspan x="97.13" y="18.23">
              t
            </tspan>
            <tspan x="101.55" y="18.23" letter-spacing="-.02em">
              r
            </tspan>
            <tspan x="106.38" y="18.23" letter-spacing="0em">
              a
            </tspan>
            <tspan x="114.03" y="18.23" letter-spacing="0em">
              t
            </tspan>
            <tspan x="118.38" y="18.23">
              ed in n
            </tspan>
            <tspan x="163.11" y="18.23" letter-spacing="0em">
              ot
            </tspan>
            <tspan x="175.84" y="18.23">
              eboo
            </tspan>
            <tspan x="209.34" y="18.23" letter-spacing="0em">
              k
            </tspan>
            <tspan x="216.61" y="18.23">
              s
            </tspan>
          </text>
          <g>
            <text
              transform="translate(917.96 554.02)"
              font-family="Satoshi-Variable"
              font-size="15.19"
              font-weight="700"
            >
              <tspan x="0" y="0">
                IMPRE
              </tspan>
              <tspan x="46.72" y="0" letter-spacing="0em">
                S
              </tspan>
              <tspan x="55.82" y="0">
                SO MODE
              </tspan>
              <tspan x="126.47" y="0" letter-spacing="-.03em">
                L
              </tspan>
              <tspan x="134.27" y="0" letter-spacing="0em">
                S on HF
              </tspan>
            </text>
            <g>
              <rect
                x="873.65"
                y="530.47"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <path d="M891.9,537.6c-6.14,0-11.12,4.98-11.12,11.12s4.98,11.12,11.12,11.12,11.12-4.98,11.12-11.12c0-6.14-4.98-11.12-11.12-11.12M891.9,558.14c-5.2,0-9.41-4.21-9.41-9.41s4.21-9.41,9.41-9.41,9.41,4.21,9.41,9.41c0,5.2-4.22,9.41-9.41,9.41M886.77,546.59c0-.71.57-1.28,1.28-1.28s1.28.57,1.28,1.28-.57,1.28-1.28,1.28-1.28-.57-1.28-1.28M897.04,546.59c0,.71-.57,1.28-1.28,1.28s-1.28-.57-1.28-1.28.57-1.28,1.28-1.28,1.28.57,1.28,1.28M896.92,551.72c-1.1,1.9-2.93,2.99-5.02,2.99s-3.92-1.09-5.02-2.99c-.25-.4-.14-.93.26-1.18.4-.25.93-.14,1.18.26.01.02.02.04.04.06.8,1.38,2.05,2.14,3.54,2.14s2.74-.76,3.54-2.14c.24-.41.76-.55,1.17-.31.41.24.55.76.31,1.17" />
            </g>
          </g>
          <polyline
            points="891.9 567.37 891.9 671.06 1152.91 671.06 1152.91 566.35 919.37 566.35"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="1.26"
          />
        </g>
        <g>
          <g>
            <text
              transform="translate(891.68 481.57)"
              font-family="Satoshi-VariableItalic"
              font-size="15.19"
              font-style="italic"
            >
              <tspan x="0" y="0">
                A series{" "}
              </tspan>
              <tspan x="54.75" y="0" letter-spacing="0em">
                o
              </tspan>
              <tspan x="63.15" y="0">
                f documen
              </tspan>
              <tspan x="133.6" y="0" letter-spacing="0em">
                t
              </tspan>
              <tspan x="137.94" y="0" letter-spacing="0em">
                ed n
              </tspan>
              <tspan x="167" y="0" letter-spacing="0em">
                ot
              </tspan>
              <tspan x="179.73" y="0">
                eboo
              </tspan>
              <tspan x="213.22" y="0" letter-spacing="0em">
                k
              </tspan>
              <tspan x="220.5" y="0" letter-spacing="0em">
                s
              </tspan>
              <tspan x="0" y="18.23" letter-spacing="-.02em">
                ex
              </tspan>
              <tspan x="14.07" y="18.23">
                ecu
              </tspan>
              <tspan x="37.88" y="18.23" letter-spacing="0em">
                t
              </tspan>
              <tspan x="42.18" y="18.23" letter-spacing="0em">
                able on Google Colab or locally
              </tspan>
            </text>
            <g opacity=".5">
              <rect
                x="916.8"
                y="390.01"
                width="36.51"
                height="36.51"
                rx="18.26"
                ry="18.26"
                fill="#ffeb78"
                stroke="#000"
                stroke-miterlimit="10"
                stroke-width="1.26"
              />
              <path d="M941.27,399.44c-2.33.02-4.55.95-6.2,2.59-3.38,3.39-3.45,8.86-.16,12.33l3.01-3.01c-1.69-1.88-1.54-4.78.34-6.47,1.74-1.57,4.39-1.57,6.13,0l3.01-3.02c-1.66-1.57-3.86-2.44-6.15-2.43M928.86,399.45c-2.29-.02-4.49.85-6.15,2.43l3.01,3.01c1.81-1.64,4.59-1.57,6.32.16l2.18-3.74-.13-.1c-1.51-1.13-3.34-1.74-5.23-1.76M947.73,402.18l-3,3c1.7,1.88,1.56,4.77-.32,6.47-1.75,1.58-4.41,1.58-6.16,0l-3.02,3.03c3.56,3.35,9.15,3.18,12.5-.37,3.21-3.41,3.21-8.73,0-12.13M922.4,402.19c-3.24,3.41-3.24,8.76,0,12.17l3.01-3.01c-1.58-1.74-1.58-4.4,0-6.15l-3.01-3.01ZM932.04,411.52c-1.73,1.72-4.5,1.79-6.31.14l-3.01,3.01c3.11,2.94,7.88,3.23,11.32.69l.17-.14-2.18-3.7Z" />
            </g>
            <g>
              <text
                transform="translate(917.91 345.4)"
                className="font-weight-bold h5"
              >
                <a href="https://github.com/impresso/impresso-datalab-notebooks">
                  Impresso Datalab Notebooks
                </a>
              </text>
              <g>
                <rect
                  x="873.65"
                  y="322.42"
                  width="36.51"
                  height="36.51"
                  rx="18.26"
                  ry="18.26"
                  fill="#ffeb78"
                  stroke="#000"
                  stroke-miterlimit="10"
                  stroke-width="1.26"
                />
                <g>
                  <path
                    d="M895.38,350.55v-2.83c.04-.47-.03-.94-.19-1.39-.16-.44-.41-.85-.74-1.19,3.09-.34,6.35-1.52,6.35-6.9,0-1.38-.53-2.7-1.48-3.7.45-1.2.42-2.53-.09-3.72,0,0-1.16-.34-3.85,1.46-2.26-.61-4.64-.61-6.9,0-2.69-1.8-3.85-1.46-3.85-1.46-.51,1.18-.54,2.51-.09,3.72-.96,1-1.49,2.34-1.48,3.73,0,5.34,3.25,6.51,6.35,6.9-.32.34-.57.73-.73,1.17-.16.44-.23.9-.19,1.37v2.83"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.63"
                  />
                  <path
                    d="M888.48,348.58c-2.96.96-5.42,0-6.9-2.96"
                    fill="none"
                    stroke="#000"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="1.63"
                  />
                </g>
              </g>
            </g>
            <polyline
              points="891.9 358.64 891.9 462.33 1152.91 462.33 1152.91 357.62 919.37 357.62"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width="1.26"
            />
            <rect
              x="1010.49"
              y="377.28"
              width="67.17"
              height="46.74"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width=".8"
            />
            <rect
              x="1020.36"
              y="386.61"
              width="67.17"
              height="46.74"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width=".8"
            />
            <rect
              x="1030.24"
              y="395.93"
              width="67.17"
              height="46.74"
              fill="none"
              stroke="#000"
              stroke-miterlimit="10"
              stroke-width=".8"
            />
          </g>
          <polyline
            points="891.9 358.64 891.9 462.33 1152.91 462.33 1152.91 357.62 919.37 357.62"
            fill="none"
            stroke="#000"
            stroke-miterlimit="10"
            stroke-width="1.26"
          />
        </g>
      </g>
    </svg>
  )
}
export default DatalabDiagram
