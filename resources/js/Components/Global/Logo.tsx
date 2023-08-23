import { useColorMode } from "@chakra-ui/react";

export const Logo = ({
  size = 32,
}) => {
  const { colorMode } = useColorMode();

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M223.14 1.556L212.78 2.887L212.524 3.193L212.267 3.5L208.631 17L204.996 30.5L202.042 44L199.088 57.5L196.559 71.5L194.03 85.5L193.47 88.75L192.909 92H255.5H318.091L317.53 88.75L316.97 85.5L314.441 71.5L311.912 57.5L308.958 44L306.004 30.5L302.369 17L298.733 3.5L298.503 3.22L298.273 2.94L286.424 1.47L274.576 0L254.038 0.112L233.5 0.225L223.14 1.556ZM140.928 26.75L125.5 34.5L114 42.167L102.5 49.834L94 56.627L85.5 63.42L73.304 75.674L61.109 87.928L60.019 89.964L58.93 92H101.92H144.909L145.426 88.75L145.942 85.5L149.502 65.5L153.061 45.5L155.591 34L158.12 22.5L158.628 20.75L159.135 19H157.745H156.356L140.928 26.75ZM352.372 20.75L352.88 22.5L355.409 34L357.939 45.5L361.498 65.5L365.058 85.5L365.574 88.75L366.091 92H409.08H452.07L450.981 89.964L449.891 87.928L437.696 75.674L425.5 63.42L417 56.627L408.5 49.834L397 42.167L385.5 34.5L370.072 26.75L354.644 19H353.255H351.865L352.372 20.75ZM25.974 142.052L22.918 148.105L18.538 158.802L14.157 169.5L10.675 181L7.19298 192.5L5.06298 202.5L2.93298 212.5L1.63498 223.25L0.336975 234H67.168H134L134.002 224.25L134.004 214.5L135.026 195.5L136.048 176.5L137.524 159.015L139 141.53V138.765V136H84.014H29.029L25.974 142.052ZM186.64 141.75L186.021 147.5L184.535 165.5L183.049 183.5L182.027 202.5L181.004 221.5L181.002 227.75L181 234H255.5H330L329.998 227.75L329.996 221.5L328.973 202.5L327.951 183.5L326.465 165.5L324.979 147.5L324.36 141.75L323.742 136H255.5H187.258L186.64 141.75ZM372 138.765V141.53L373.476 159.015L374.952 176.5L375.974 195.5L376.996 214.5L376.998 224.25L377 234H443.832H510.663L509.365 223.25L508.067 212.5L505.937 202.5L503.807 192.5L500.325 181L496.843 169.5L492.462 158.802L488.082 148.105L485.026 142.052L481.971 136H426.986H372V138.765ZM1.63498 288.75L2.93298 299.5L5.06298 309.5L7.19298 319.5L10.675 331L14.157 342.5L18.548 353.224L22.94 363.948L25.487 368.974L28.034 374H83.517H139V372.735V371.47L137.524 353.985L136.048 336.5L135.026 317.5L134.004 298.5L134.002 288.25L134 278H67.168H0.336975L1.63498 288.75ZM181.001 284.75V291.5L181.998 310L182.995 328.5L184.513 347.5L186.031 366.5L186.604 370.25L187.176 374H255.5H323.824L324.396 370.25L324.969 366.5L326.487 347.5L328.005 328.5L329.002 310L329.999 291.5V284.75L330 278H255.5H181L181.001 284.75ZM376.998 288.25L376.996 298.5L375.974 317.5L374.952 336.5L373.476 353.985L372 371.47V372.735V374H427.483H482.966L485.513 368.974L488.06 363.948L492.452 353.224L496.843 342.5L500.325 331L503.807 319.5L505.937 309.5L508.067 299.5L509.365 288.75L510.663 278H443.832H377L376.998 288.25ZM60.15 422.25L63.469 426.5L74.484 437.522L85.5 448.545L94 455.355L102.5 462.166L114 469.833L125.5 477.5L140.928 485.25L156.356 493H157.588H158.82L157.436 487.25L156.052 481.5L152.096 461.5L148.141 441.5L146.386 429.75L144.632 418H100.732H56.832L60.15 422.25ZM193 419.775V421.551L195.538 436.025L198.076 450.5L201.516 466.5L204.956 482.5L208.503 495.442L212.05 508.384L212.389 508.722L212.727 509.06L224.576 510.53L236.424 512H255.5H274.576L286.424 510.53L298.273 509.06L298.611 508.722L298.95 508.384L302.497 495.442L306.044 482.5L309.484 466.5L312.924 450.5L315.462 436.025L318 421.551V419.775V418H255.5H193V419.775ZM364.614 429.75L362.859 441.5L358.904 461.5L354.948 481.5L353.564 487.25L352.18 493H353.412H354.644L370.072 485.25L385.5 477.5L397 469.833L408.5 462.166L417 455.355L425.5 448.545L436.516 437.522L447.531 426.5L450.85 422.25L454.168 418H410.268H366.368L364.614 429.75Z"
        fill={colorMode === "dark" ? "#FEEBC8" : "#44403c"}
      />

      <path
        fill-rule="evenodd"
        clip-rule="evenodd"
        d="M25.974 142.052L22.918 148.105L18.538 158.802L14.157 169.5L10.675 181L7.19298 192.5L5.06298 202.5L2.93298 212.5L1.63498 223.25L0.336975 234H67.168H134L134.002 224.25L134.004 214.5L135.026 195.5L136.048 176.5L137.524 159.015L139 141.53V138.765V136H84.014H29.029L25.974 142.052ZM186.64 141.75L186.021 147.5L184.535 165.5L183.049 183.5L182.027 202.5L181.004 221.5L181.002 227.75L181 234H255.5H330L329.998 227.75L329.996 221.5L328.973 202.5L327.951 183.5L326.465 165.5L324.979 147.5L324.36 141.75L323.742 136H255.5H187.258L186.64 141.75ZM372 138.765V141.53L373.476 159.015L374.952 176.5L375.974 195.5L376.996 214.5L376.998 224.25L377 234H443.832H510.663L509.365 223.25L508.067 212.5L505.937 202.5L503.807 192.5L500.325 181L496.843 169.5L492.462 158.802L488.082 148.105L485.026 142.052L481.971 136H426.986H372V138.765Z"
        fill="#ED8936"
      />

    </svg>
  );
};
