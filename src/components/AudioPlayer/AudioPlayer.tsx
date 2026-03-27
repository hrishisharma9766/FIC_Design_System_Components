import React, { forwardRef, useState, useEffect, useRef } from 'react';
import './AudioPlayer.css';


const BackwardIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.99711C2 8.80016 2.15686 9.55712 2.47059 10.268C2.78431 10.9788 3.21764 11.6041 3.77058 12.144C4.32353 12.6838 4.96176 13.1075 5.68529 13.4149C6.40882 13.7222 7.18039 13.8759 7.99999 13.8759C8.81962 13.8759 9.59118 13.7222 10.3147 13.4149C11.0382 13.1075 11.6765 12.6838 12.2294 12.144C12.7823 11.6041 13.2157 10.9788 13.5294 10.268C13.8431 9.55712 14 8.80016 14 7.99711C14 7.2901 13.8765 6.61768 13.6294 5.97986C13.3823 5.34203 13.0382 4.76471 12.5971 4.24791C12.1559 3.73111 11.6402 3.29884 11.05 2.95111C10.4598 2.60337 9.82156 2.36226 9.13528 2.22778V1.40935C9.13528 1.20186 9.07451 1.07314 8.95295 1.02319C8.83136 0.973241 8.69017 1.00398 8.52938 1.11541L6.65294 2.40068C6.51568 2.4929 6.44705 2.60049 6.44705 2.72344C6.44705 2.8464 6.51568 2.95591 6.65294 3.05197L8.52353 4.34301C8.68432 4.45828 8.82648 4.48998 8.95 4.43811C9.07352 4.38623 9.13528 4.25655 9.13528 4.04907V3.23064C9.69214 3.35359 10.2049 3.56108 10.6735 3.85311C11.1421 4.14512 11.55 4.50246 11.8971 4.92513C12.2441 5.34779 12.5137 5.81944 12.7058 6.34008C12.898 6.86071 12.9941 7.41306 12.9941 7.99711C12.9941 8.6772 12.8657 9.31408 12.6088 9.90773C12.352 10.5014 11.9951 11.022 11.5382 11.4697C11.0814 11.9173 10.551 12.267 9.94707 12.5186C9.34316 12.7703 8.69413 12.8962 7.99999 12.8962C7.30588 12.8962 6.65588 12.7703 6.04999 12.5186C5.44411 12.267 4.91274 11.9173 4.45588 11.4697C3.99902 11.022 3.64215 10.5014 3.38529 9.90773C3.12843 9.31408 3 8.6772 3 7.99711C3 7.4515 3.08627 6.93182 3.25882 6.43806C3.43137 5.94432 3.67255 5.4938 3.98235 5.08651C4.29215 4.67921 4.6549 4.32956 5.07059 4.03754C5.19215 3.94916 5.2696 3.84158 5.30294 3.71478C5.33627 3.58798 5.31568 3.46502 5.24117 3.34591C5.16666 3.23064 5.05882 3.16051 4.91764 3.13554C4.77647 3.11056 4.64117 3.14611 4.51176 3.24217C4.00588 3.59951 3.56471 4.02505 3.18824 4.5188C2.81177 5.01254 2.51961 5.55432 2.31176 6.14412C2.10392 6.73394 2 7.3516 2 7.99711ZM6.28235 10.3602C6.39607 10.3602 6.48627 10.3246 6.55293 10.2535C6.6196 10.1825 6.65294 10.0855 6.65294 9.9625V6.32567C6.65294 6.17582 6.61764 6.06343 6.54705 5.98851C6.47647 5.91358 6.37451 5.87611 6.24117 5.87611C6.15882 5.87611 6.08235 5.89052 6.01176 5.91934C5.94117 5.94816 5.85294 5.99715 5.74705 6.06632L4.94117 6.60233C4.87451 6.64844 4.82451 6.69935 4.79117 6.75506C4.75784 6.81077 4.74117 6.87129 4.74117 6.9366C4.74117 7.03268 4.77451 7.11529 4.84118 7.18442C4.90784 7.25359 4.98823 7.28817 5.08235 7.28817C5.14117 7.28817 5.19019 7.2805 5.22941 7.26516C5.26862 7.24977 5.31372 7.22095 5.3647 7.17869L5.92941 6.77523H5.91764V9.9625C5.91764 10.0816 5.95098 10.1777 6.01764 10.2507C6.08431 10.3237 6.17255 10.3602 6.28235 10.3602ZM9.27057 10.4293C9.75683 10.4293 10.148 10.2881 10.4441 10.0057C10.7402 9.72328 10.8882 9.34961 10.8882 8.88469C10.8882 8.46204 10.7569 8.1143 10.4941 7.84148C10.2314 7.56869 9.89019 7.4323 9.47055 7.4323C9.28234 7.4323 9.09902 7.47455 8.92061 7.55907C8.74215 7.64362 8.61371 7.75891 8.53528 7.90492H8.56468L8.67057 6.60233H10.4294C10.5157 6.60233 10.5912 6.57159 10.6559 6.51011C10.7206 6.44863 10.7529 6.36794 10.7529 6.26804C10.7529 6.17198 10.7206 6.09417 10.6559 6.03462C10.5912 5.97506 10.5157 5.94528 10.4294 5.94528H8.55293C8.24312 5.94528 8.0745 6.10474 8.04707 6.42366L7.91764 8.08357C7.90587 8.22573 7.93529 8.33236 8.00587 8.40345C8.07647 8.47451 8.17648 8.51004 8.3059 8.51004C8.39999 8.51004 8.47645 8.49851 8.53528 8.47546C8.59411 8.45244 8.66471 8.41018 8.74707 8.34868C8.86079 8.24879 8.96667 8.17674 9.06469 8.13256C9.16275 8.08837 9.27059 8.06628 9.38821 8.06628C9.61566 8.06628 9.79998 8.14216 9.94117 8.29391C10.0824 8.44571 10.153 8.64647 10.153 8.8962C10.153 9.14983 10.0726 9.35925 9.91178 9.52446C9.75099 9.68967 9.54902 9.77228 9.30587 9.77228C9.12942 9.77228 8.9706 9.72713 8.82941 9.63683C8.68822 9.54653 8.58038 9.42647 8.50589 9.27664C8.46276 9.20361 8.41373 9.14694 8.35879 9.10661C8.3039 9.06624 8.2392 9.04605 8.16471 9.04605C8.06666 9.04605 7.98725 9.0768 7.92647 9.1383C7.86568 9.19976 7.83529 9.28046 7.83529 9.38039C7.83529 9.4188 7.83921 9.45722 7.84705 9.49566C7.85489 9.53406 7.86666 9.57248 7.88234 9.61092C7.96078 9.81839 8.12254 10.0067 8.36765 10.1757C8.61272 10.3448 8.9137 10.4293 9.27057 10.4293Z" fill="var(--Colors-Functional-Input-Icons-Icon_DarkGray, #4B4B4A)"/>
            </svg>);

const PlayIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2.74691 15.0001C2.91209 15.0001 3.06902 14.9712 3.2177 14.9134C3.36637 14.8556 3.52331 14.7771 3.6885 14.678L13.3192 9.11098C13.6661 8.90725 13.907 8.72692 14.0419 8.56998C14.1768 8.41305 14.2442 8.22446 14.2442 8.0042C14.2442 7.78394 14.1768 7.59534 14.0419 7.43841C13.907 7.28148 13.6661 7.1039 13.3192 6.90567L3.6885 1.33044C3.52331 1.23683 3.36637 1.16111 3.2177 1.1033C3.06902 1.04548 2.91209 1.01657 2.74691 1.01657C2.44405 1.01657 2.20314 1.12395 2.02419 1.3387C1.84523 1.55345 1.75575 1.83978 1.75575 2.1977V13.8107C1.75575 14.1686 1.84523 14.4563 2.02419 14.6738C2.20314 14.8913 2.44405 15.0001 2.74691 15.0001Z" fill="var(--Colors-Functional-Input-Icons-Icon_DarkGray, #4B4B4A)"/>
            </svg>);

const PauseIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect x="3" y="2" width="3" height="12" rx="1" fill="var(--Colors-Functional-Input-Icons-Icon_DarkGray, #4B4B4A)"/>
    <rect x="10" y="2" width="3" height="12" rx="1" fill="var(--Colors-Functional-Input-Icons-Icon_DarkGray, #4B4B4A)"/>
  </svg>
);
const ForwardIcon = () => (<svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 7.99711C2 8.80042 2.15686 9.55759 2.47059 10.2686C2.78431 10.9796 3.21764 11.6052 3.77058 12.1452C4.32353 12.6852 4.96176 13.1089 5.68529 13.4164C6.40882 13.7239 7.18039 13.8776 7.99999 13.8776C8.81962 13.8776 9.59118 13.7239 10.3147 13.4164C11.0382 13.1089 11.6765 12.6852 12.2294 12.1452C12.7823 11.6052 13.2157 10.9796 13.5294 10.2686C13.8431 9.55759 14 8.80042 14 7.99711C14 7.35142 13.8961 6.73359 13.6882 6.14363C13.4804 5.55366 13.1882 5.01173 12.8117 4.51785C12.4353 4.02396 11.9941 3.5983 11.4883 3.24086C11.3588 3.14478 11.2235 3.10923 11.0823 3.13421C10.9412 3.15919 10.8333 3.22933 10.7588 3.34464C10.6843 3.46378 10.6637 3.58677 10.6971 3.71361C10.7304 3.84044 10.8078 3.94805 10.9294 4.03645C11.3451 4.32856 11.7078 4.67831 12.0177 5.08572C12.3274 5.49312 12.5686 5.94377 12.7411 6.43765C12.9137 6.93153 13 7.45134 13 7.99711C13 8.67743 12.8716 9.31448 12.6147 9.90826C12.3578 10.5021 12.001 11.0229 11.5441 11.4706C11.0872 11.9184 10.5559 12.2682 9.94997 12.5199C9.34412 12.7717 8.69413 12.8975 7.99999 12.8975C7.30588 12.8975 6.65686 12.7717 6.05294 12.5199C5.44902 12.2682 4.91862 11.9184 4.46176 11.4706C4.0049 11.0229 3.64804 10.5021 3.39117 9.90826C3.13431 9.31448 3.00588 8.67743 3.00588 7.99711C3.00588 7.41293 3.10196 6.86044 3.29412 6.33964C3.48627 5.81886 3.75588 5.34707 4.10294 4.92429C4.45 4.50151 4.85882 4.14407 5.32941 3.85197C5.79999 3.55987 6.31176 3.35232 6.8647 3.22933V4.05375C6.8647 4.25746 6.92646 4.38525 7.04999 4.43713C7.17352 4.48902 7.31568 4.45924 7.47647 4.34778L9.35291 3.05638C9.48627 2.96798 9.55392 2.86132 9.55585 2.73641C9.55781 2.6115 9.49017 2.50292 9.35291 2.41068L7.48234 1.11928C7.31764 1.00398 7.17352 0.972268 7.04999 1.02415C6.92646 1.07604 6.8647 1.20576 6.8647 1.4133V2.22619C6.17843 2.36071 5.54019 2.60189 4.95 2.94972C4.3598 3.29755 3.84411 3.72994 3.40294 4.24689C2.96176 4.76383 2.61765 5.34131 2.37059 5.97932C2.12353 6.61735 2 7.28994 2 7.99711ZM6.25294 10.3608C6.36666 10.3608 6.45686 10.3253 6.52353 10.2542C6.59019 10.1831 6.62352 10.086 6.62352 9.96304V6.32523C6.62352 6.17534 6.58823 6.06292 6.51764 5.98797C6.44705 5.91302 6.34509 5.87555 6.21176 5.87555C6.12941 5.87555 6.05294 5.88996 5.98235 5.91879C5.91176 5.94761 5.82353 5.99661 5.71765 6.06579L4.91176 6.60196C4.84509 6.64808 4.79509 6.699 4.76176 6.75474C4.72843 6.81047 4.71176 6.87101 4.71176 6.93636C4.71176 7.03243 4.74509 7.11506 4.81176 7.18425C4.87843 7.25344 4.95882 7.28803 5.05294 7.28803C5.11176 7.28803 5.16078 7.28034 5.2 7.26495C5.23921 7.24956 5.28431 7.22073 5.33529 7.17846L5.9 6.77492H5.88823V9.96304C5.88823 10.0822 5.92156 10.1783 5.98823 10.2513C6.0549 10.3243 6.14313 10.3608 6.25294 10.3608ZM9.24118 10.43C9.72744 10.43 10.1186 10.2888 10.4147 10.0063C10.7108 9.72381 10.8588 9.35002 10.8588 8.88494C10.8588 8.46217 10.7274 8.11435 10.4647 7.84149C10.2019 7.56859 9.86076 7.43214 9.44116 7.43214C9.25294 7.43214 9.06961 7.47443 8.89115 7.55901C8.71273 7.64354 8.58431 7.75884 8.50589 7.90489H8.53528L8.64117 6.60196H10.4C10.4863 6.60196 10.5618 6.57121 10.6265 6.50972C10.6912 6.44822 10.7235 6.36751 10.7235 6.26758C10.7235 6.17149 10.6912 6.09366 10.6265 6.03409C10.5618 5.97452 10.4863 5.94473 10.4 5.94473H8.52353C8.21372 5.94473 8.04509 6.10423 8.01764 6.42324L7.88823 8.08359C7.87646 8.22583 7.90587 8.33249 7.97647 8.40357C8.04707 8.47468 8.14706 8.51024 8.27645 8.51024C8.37058 8.51024 8.44706 8.49871 8.50589 8.47565C8.56472 8.45258 8.63529 8.4103 8.71761 8.34878C8.83134 8.24885 8.93723 8.17679 9.03529 8.13259C9.13332 8.0884 9.24116 8.0663 9.35882 8.0663C9.58626 8.0663 9.77058 8.14222 9.91178 8.29405C10.0529 8.44585 10.1235 8.64667 10.1235 8.89651C10.1235 9.15017 10.0431 9.35962 9.88232 9.52488C9.72153 9.69018 9.51958 9.77283 9.27647 9.77283C9.09999 9.77283 8.94117 9.72767 8.80001 9.63735C8.65882 9.54702 8.55098 9.4269 8.47649 9.27699C8.43332 9.20399 8.38429 9.14729 8.3294 9.10691C8.2745 9.06657 8.20979 9.0464 8.13526 9.0464C8.03724 9.0464 7.95784 9.07714 7.89705 9.13861C7.83627 9.20013 7.80587 9.28085 7.80587 9.38078C7.80587 9.41919 7.8098 9.45762 7.81764 9.49607C7.82548 9.53453 7.83725 9.57296 7.85294 9.61137C7.93137 9.81894 8.09314 10.0073 8.33825 10.1763C8.58333 10.3455 8.8843 10.43 9.24118 10.43Z" fill="var(--Colors-Functional-Input-Icons-Icon_DarkGray, #4B4B4A)"/>
            </svg>);

const VolumeIcon = () => (<svg width="22" height="16" viewBox="0 0 22 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_15777_1245)">
                <path d="M8.75134 15.0118C9.02195 15.0118 9.2425 14.9252 9.41297 14.752C9.5835 14.5788 9.66876 14.3623 9.66876 14.1025V1.64926C9.66876 1.38407 9.58216 1.15811 9.40898 0.97139C9.23579 0.784674 9.01117 0.691317 8.73513 0.691317C8.5457 0.691317 8.37522 0.734614 8.22369 0.821207C8.07215 0.907801 7.89355 1.05122 7.6879 1.25147L4.22956 4.49873C4.17544 4.54744 4.10778 4.5718 4.02661 4.5718H1.6967C1.15007 4.5718 0.730636 4.72198 0.438381 5.02235C0.146127 5.32272 0 5.76516 0 6.34967V9.36966C0 9.95955 0.146127 10.4033 0.438381 10.701C0.730636 10.9986 1.15007 11.1475 1.6967 11.1475H4.02661C4.10778 11.1475 4.17544 11.1718 4.22956 11.2205L7.6879 14.5003C7.87191 14.6789 8.0478 14.8088 8.21557 14.89C8.38332 14.9712 8.56191 15.0118 8.75134 15.0118ZM12.5588 11.3018C12.6995 11.3938 12.8537 11.4249 13.0216 11.3951C13.1893 11.3654 13.3273 11.272 13.4355 11.1151C13.7494 10.7037 13.9943 10.2112 14.1702 9.6375C14.3461 9.06385 14.4341 8.46582 14.4341 7.84342C14.4341 7.22102 14.3461 6.62298 14.1702 6.0493C13.9943 5.47562 13.7494 4.98312 13.4355 4.5718C13.3273 4.41485 13.1893 4.32013 13.0216 4.28766C12.8537 4.25519 12.6995 4.28766 12.5588 4.38508C12.3964 4.49873 12.3031 4.64621 12.2787 4.82752C12.2544 5.00882 12.3071 5.18336 12.437 5.35114C12.6751 5.67587 12.8578 6.05472 12.985 6.48768C13.1122 6.92065 13.1758 7.37256 13.1758 7.84342C13.1758 8.31425 13.1108 8.7648 12.9809 9.19508C12.8511 9.62536 12.6697 10.0056 12.437 10.3357C12.3125 10.5089 12.2611 10.6848 12.2828 10.8633C12.3044 11.042 12.3964 11.1881 12.5588 11.3018ZM15.5787 13.4206C15.7303 13.518 15.89 13.5518 16.0577 13.5221C16.2255 13.4923 16.3635 13.399 16.4718 13.242C16.9913 12.5276 17.3959 11.6995 17.6854 10.7578C17.975 9.81615 18.1197 8.84467 18.1197 7.84342C18.1197 6.84217 17.9763 5.86799 17.6895 4.92088C17.4026 3.97376 16.9967 3.14841 16.4718 2.44483C16.3635 2.28789 16.2255 2.19318 16.0577 2.1607C15.89 2.12823 15.7303 2.16341 15.5787 2.26624C15.4326 2.36907 15.3474 2.50573 15.323 2.67621C15.2987 2.84669 15.346 3.01582 15.4651 3.18359C15.9089 3.8114 16.2526 4.5285 16.4961 5.3349C16.7397 6.14131 16.8614 6.97748 16.8614 7.84342C16.8614 8.70934 16.7383 9.54415 16.4921 10.3478C16.2458 11.1515 15.9034 11.87 15.4651 12.5032C15.3514 12.671 15.3054 12.8401 15.3271 13.0106C15.3487 13.1811 15.4326 13.3178 15.5787 13.4206ZM18.623 15.5719C18.7637 15.6747 18.9207 15.7072 19.0939 15.6693C19.2671 15.6314 19.4078 15.5313 19.5161 15.369C19.9923 14.6816 20.3996 13.9388 20.7378 13.1405C21.0761 12.3422 21.3358 11.4993 21.5172 10.6117C21.6985 9.7241 21.7891 8.80133 21.7891 7.84342C21.7891 6.88547 21.6971 5.96271 21.5131 5.07512C21.3291 4.18753 21.0666 3.3446 20.7256 2.54632C20.3847 1.74803 19.9815 1.00522 19.5161 0.317881C19.4078 0.150106 19.2671 0.0486294 19.0939 0.0134507C18.9207 -0.021728 18.7637 0.0120977 18.623 0.114928C18.4715 0.217757 18.3849 0.355766 18.3632 0.528953C18.3416 0.702141 18.3876 0.872622 18.5013 1.0404C18.918 1.66279 19.2793 2.33254 19.5851 3.04964C19.8908 3.76674 20.1276 4.52714 20.2954 5.33084C20.4632 6.13454 20.5471 6.97207 20.5471 7.84342C20.5471 8.70934 20.4632 9.54415 20.2954 10.3478C20.1276 11.1515 19.8908 11.9147 19.5851 12.6372C19.2793 13.3597 18.918 14.0294 18.5013 14.6464C18.3876 14.8088 18.3416 14.9779 18.3632 15.1538C18.3849 15.3297 18.4715 15.4691 18.623 15.5719Z" fill="var(--Colors-Functional-Input-Icons-Icon_DarkGray, #4B4B4A)"/>
                </g>
                <defs>
                <clipPath id="clip0_15777_1245">
                <rect width="21.7891" height="15.6949" fill="white"/>
                </clipPath>
                </defs>
                </svg>);

export interface AudioPlayerProps {
  variant?: 'long' | 'short';
  currentTime?: number;
  duration?: number;
  isPlaying?: boolean;
  isMuted?: boolean;
  disabled?: boolean;
  source?: string;
  onPlayPause?: () => void;
  onBackward?: () => void;
  onForward?: () => void;
  onVolumeChange?: (volume: number) => void;
  onTimeUpdate?: (time: number) => void;
  onSeek?: (time: number) => void;
}

const formatTime = (seconds: number): string => {
  const mins = Math.floor(seconds / 60);
  const secs = Math.floor(seconds % 60);
  return `${mins}:${secs.toString().padStart(2, '0')}`;
};

export const AudioPlayer = forwardRef<HTMLDivElement, AudioPlayerProps>(({
  variant = 'long',
  currentTime = 0,
  duration = 83,
  isPlaying = false,
  isMuted = false,
  disabled = false,
  source,
  onPlayPause,
  onBackward,
  onForward,
  onVolumeChange,
  onTimeUpdate,
  onSeek,
}, ref) => {
  const [internalIsPlaying, setInternalIsPlaying] = useState(isPlaying);
  const [internalCurrentTime, setInternalCurrentTime] = useState(currentTime);
  const [internalDuration, setInternalDuration] = useState(duration);
  const [internalIsMuted, setInternalIsMuted] = useState(isMuted);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => { setInternalIsPlaying(isPlaying); }, [isPlaying]);
  useEffect(() => { 
    setInternalCurrentTime(currentTime); 
    if (audioRef.current && Math.abs(audioRef.current.currentTime - currentTime) > 1) {
      audioRef.current.currentTime = currentTime;
    }
  }, [currentTime]);
  useEffect(() => { setInternalDuration(duration); }, [duration]);
  useEffect(() => { 
    setInternalIsMuted(isMuted); 
    if (audioRef.current) {
      audioRef.current.muted = isMuted;
    }
  }, [isMuted]);

  useEffect(() => {
    if (audioRef.current) {
      if (internalIsPlaying) {
        audioRef.current.play().catch(e => console.log('Playback failed:', e));
      } else {
        audioRef.current.pause();
      }
    }
  }, [internalIsPlaying, source]);

  useEffect(() => {
    let interval: ReturnType<typeof setInterval>;
    if (!source && internalIsPlaying) {
      interval = setInterval(() => {
        setInternalCurrentTime(prev => {
          const nextTime = prev + 1;
          if (nextTime >= internalDuration) {
            setInternalIsPlaying(false);
            if (onTimeUpdate) onTimeUpdate(internalDuration);
            return internalDuration;
          }
          if (onTimeUpdate) onTimeUpdate(nextTime);
          return nextTime;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [internalIsPlaying, internalDuration, onTimeUpdate, source]);

  const handleTimeUpdate = () => {
    if (audioRef.current) {
      setInternalCurrentTime(audioRef.current.currentTime);
      if (onTimeUpdate) onTimeUpdate(audioRef.current.currentTime);
    }
  };

  const handleLoadedMetadata = () => {
    if (audioRef.current) {
      setInternalDuration(audioRef.current.duration);
    }
  };

  const handleEnded = () => {
    setInternalIsPlaying(false);
    if (onTimeUpdate) onTimeUpdate(internalDuration);
  };

  const progress = internalDuration > 0 ? (internalCurrentTime / internalDuration) * 100 : 0;

  const handlePlayPause = () => {
    if (disabled) return;
    const newState = !internalIsPlaying;
    setInternalIsPlaying(newState);
    if (onPlayPause) onPlayPause();
  };

  const handleBackward = () => {
    if (disabled) return;
    const newTime = Math.max(0, internalCurrentTime - 10);
    setInternalCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    if (onBackward) onBackward();
    if (onSeek) onSeek(newTime);
  };

  const handleForward = () => {
    if (disabled) return;
    const newTime = Math.min(internalDuration, internalCurrentTime + 10);
    setInternalCurrentTime(newTime);
    if (audioRef.current) {
      audioRef.current.currentTime = newTime;
    }
    if (onForward) onForward();
    if (onSeek) onSeek(newTime);
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (disabled) return;
    if (internalDuration > 0) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickX = e.clientX - rect.left;
      const percentage = Math.max(0, Math.min(1, clickX / rect.width));
      const newTime = percentage * internalDuration;
      setInternalCurrentTime(newTime);
      if (audioRef.current) {
        audioRef.current.currentTime = newTime;
      }
      if (onSeek) onSeek(newTime);
    }
  };

  const handleVolumeClick = () => {
    if (disabled) return;
    const newState = !internalIsMuted;
    setInternalIsMuted(newState);
    if (audioRef.current) {
      audioRef.current.muted = newState;
    }
    if (onVolumeChange) onVolumeChange(newState ? 0 : 1);
  };

  return (
    <div ref={ref} className="audioplayer-container">
      {source && (
        <audio
          ref={audioRef}
          src={source}
          onTimeUpdate={handleTimeUpdate}
          onLoadedMetadata={handleLoadedMetadata}
          onEnded={handleEnded}
          muted={internalIsMuted}
        />
      )}
      <div className={`audioplayer-wrapper audioplayer-wrapper--${variant}`}>
        <div className="audioplayer-controls">
          <button
            type="button"
            className={`audioplayer-control-btn ${disabled ? 'audioplayer-icon-disabled' : ''}`}
            onClick={handleBackward}
            disabled={disabled}
            aria-label="Backward"
          >
            <BackwardIcon />
          </button>
          <button
            type="button"
            className={`audioplayer-control-btn ${disabled ? 'audioplayer-icon-disabled' : ''}`}
            onClick={handlePlayPause}
            disabled={disabled}
            aria-label={internalIsPlaying ? 'Pause' : 'Play'}
          >
            {internalIsPlaying ? <PauseIcon /> : <PlayIcon />}
          </button>
          <button
            type="button"
            className={`audioplayer-control-btn ${disabled ? 'audioplayer-icon-disabled' : ''}`}
            onClick={handleForward}
            disabled={disabled}
            aria-label="Forward"
          >
            <ForwardIcon />
          </button>
        </div>

        <div className="audioplayer-timeline">
          <span className="audioplayer-time">{formatTime(internalCurrentTime)}</span>
          <div
            className={`audioplayer-progress-track ${disabled ? 'audioplayer-icon-disabled' : ''}`}
            onClick={handleProgressClick}
            role="slider"
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={internalDuration}
            aria-valuenow={internalCurrentTime}
            style={{ cursor: disabled ? 'not-allowed' : 'pointer' }}
          >
            <div
              className="audioplayer-progress-fill"
              style={{ width: `${progress}%` }}
            />
          </div>
          <span className="audioplayer-time">{formatTime(internalDuration)}</span>
        </div>

        <div className="audioplayer-volume">
          <button
            type="button"
            className={`audioplayer-volume-btn ${disabled ? 'audioplayer-icon-disabled' : ''}`}
            onClick={handleVolumeClick}
            disabled={disabled}
            aria-label={internalIsMuted ? 'Unmute' : 'Mute'}
            style={{ opacity: internalIsMuted ? 0.5 : 1 }}
          >
            <VolumeIcon />
          </button>
        </div>
      </div>
    </div>
  );
});

AudioPlayer.displayName = 'AudioPlayer';

export default AudioPlayer;