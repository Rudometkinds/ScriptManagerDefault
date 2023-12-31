"use strict";

(function () {
    var $ = Breinify.UTL._jquery();

    var style = `<style>
        *,
        ::after,
        ::before {
            box-sizing: border-box;
        }
        @media (prefers-reduced-motion: no-preference) {
            :root {
                scroll-behavior: smooth;
            }
        }
        .br-text-start {
            text-align: left !important;
        }
        .br-text-end {
            text-align: right !important;
        }
        .br-text-center {
            text-align: center !important;
        }
        .br-text-decoration-none {
            text-decoration: none !important;
        }
        .br-text-decoration-underline {
            text-decoration: underline !important;
        }
        .br-text-decoration-line-through {
            text-decoration: line-through !important;
        }
        .br-text-lowercase {
            text-transform: lowercase !important;
        }
        .br-text-uppercase {
            text-transform: uppercase !important;
        }
        .br-text-capitalize {
            text-transform: capitalize !important;
        }
        .br-text-wrap {
            white-space: normal !important;
        }
        .br-text-nowrap {
            white-space: nowrap !important;
        }
        .br-text-break {
            word-wrap: break-word !important;
            word-break: break-word !important;
        }
        .br-text-primary {
            color: #0d6efd !important;
        }
        .br-text-secondary {
            color: #6c757d !important;
        }
        .br-text-success {
            color: #198754 !important;
        }
        .br-text-info {
            color: #0dcaf0 !important;
        }
        .br-text-warning {
            color: #ffc107 !important;
        }
        .br-text-danger {
            color: #dc3545 !important;
        }
        .br-text-light {
            color: #f8f9fa !important;
        }
        .br-text-dark {
            color: #212529 !important;
        }
        .br-text-white {
            color: #fff !important;
        }
        .br-text-body {
            color: #212529 !important;
        }
        .br-text-muted {
            color: #6c757d !important;
        }
        .br-text-black-50 {
            color: rgba(0, 0, 0, 0.5) !important;
        }
        .br-text-white-50 {
            color: rgba(255, 255, 255, 0.5) !important;
        }
        .br-text-reset {
            color: inherit !important;
        }
        .text-truncate {
            overflow: hidden;
            text-overflow: ellipsis;
            white-space: nowrap;
        }
        .figure {
            display: inline-block;
             margin: 0 0 1rem;
        }
        .figure-img {
            margin-bottom: 0.5rem;
            line-height: 1;
        }
        .figure-caption {
            font-size: 0.875em;
            color: #6c757d;
        }
        br-img,
        br-svg {
            vertical-align: middle !important;
        }
        .img-fluid {
            max-width: 100%;
            height: auto;
        }
        .img-thumbnail {
            padding: 0.25rem;
            background-color: #fff;
            border: 1px solid #dee2e6;
            border-radius: 0.25rem;
            max-width: 100%;
            height: auto;
        }
        .m-0 {
            margin: 0 !important;
        }
        .m-1 {
            margin: 0.25rem !important;
        }
        .m-2 {
            margin: 0.5rem !important;
        }
        .m-3 {
            margin: 1rem !important;
        }
        .m-4 {
            margin: 1.5rem !important;
        }
        .m-5 {
            margin: 3rem !important;
        }
        .m-auto {
            margin: auto !important;
        }
        .mx-0 {
            margin-right: 0 !important;
            margin-left: 0 !important;
        }
        .mx-1 {
            margin-right: 0.25rem !important;
            margin-left: 0.25rem !important;
        }
        .mx-2 {
            margin-right: 0.5rem !important;
            margin-left: 0.5rem !important;
        }
        .mx-3 {
            margin-right: 1rem !important;
            margin-left: 1rem !important;
        }
        .mx-4 {
            margin-right: 1.5rem !important;
            margin-left: 1.5rem !important;
        }
        .mx-5 {
            margin-right: 3rem !important;
            margin-left: 3rem !important;
        }
        .mx-auto {
            margin-right: auto !important;
            margin-left: auto !important;
        }
        .my-0 {
            margin-top: 0 !important;
            margin-bottom: 0 !important;
        }
        .my-1 {
            margin-top: 0.25rem !important;
            margin-bottom: 0.25rem !important;
        }
        .my-2 {
            margin-top: 0.5rem !important;
            margin-bottom: 0.5rem !important;
        }
        .my-3 {
            margin-top: 1rem !important;
            margin-bottom: 1rem !important;
        }
        .my-4 {
            margin-top: 1.5rem !important;
            margin-bottom: 1.5rem !important;
        }
        .my-5 {
            margin-top: 3rem !important;
            margin-bottom: 3rem !important;
        }
        .my-auto {
            margin-top: auto !important;
            margin-bottom: auto !important;
        }
        .mt-0 {
            margin-top: 0 !important;
        }
        .mt-1 {
            margin-top: 0.25rem !important;
        }
        .mt-2 {
            margin-top: 0.5rem !important;
        }
        .mt-3 {
            margin-top: 1rem !important;
        }
        .mt-4 {
            margin-top: 1.5rem !important;
        }
        .mt-5 {
            margin-top: 3rem !important;
        }
        .mt-auto {
            margin-top: auto !important;
        }
        .me-0 {
            margin-right: 0 !important;
        }
        .me-1 {
            margin-right: 0.25rem !important;
        }
        .me-2 {
            margin-right: 0.5rem !important;
        }
        .me-3 {
            margin-right: 1rem !important;
        }
        .me-4 {
            margin-right: 1.5rem !important;
        }
        .me-5 {
            margin-right: 3rem !important;
        }
        .me-auto {
            margin-right: auto !important;
        }
        .mb-0 {
            margin-bottom: 0 !important;
        }
        .mb-1 {
            margin-bottom: 0.25rem !important;
        }
        .mb-2 {
            margin-bottom: 0.5rem !important;
        }
        .mb-3 {
            margin-bottom: 1rem !important;
        }
        .mb-4 {
            margin-bottom: 1.5rem !important;
        }
        .mb-5 {
            margin-bottom: 3rem !important;
        }
        .mb-auto {
            margin-bottom: auto !important;
        }
        .ms-0 {
            margin-left: 0 !important;
        }
        .ms-1 {
            margin-left: 0.25rem !important;
        }
        .ms-2 {
            margin-left: 0.5rem !important;
        }
        .ms-3 {
            margin-left: 1rem !important;
        }
        .ms-4 {
            margin-left: 1.5rem !important;
        }
        .ms-5 {
            margin-left: 3rem !important;
        }
        .ms-auto {
            margin-left: auto !important;
        }
        .p-0 {
            padding: 0 !important;
        }
        .p-1 {
            padding: 0.25rem !important;
        }
        .p-2 {
            padding: 0.5rem !important;
        }
        .p-3 {
            padding: 1rem !important;
        }
        .p-4 {
            padding: 1.5rem !important;
        }
        .p-5 {
            padding: 3rem !important;
        }
        .px-0 {
            padding-right: 0 !important;
            padding-left: 0 !important;
        }
        .px-1 {
            padding-right: 0.25rem !important;
            padding-left: 0.25rem !important;
        }
        .px-2 {
            padding-right: 0.5rem !important;
            padding-left: 0.5rem !important;
        }
        .px-3 {
            padding-right: 1rem !important;
            padding-left: 1rem !important;
        }
        .px-4 {
            padding-right: 1.5rem !important;
            padding-left: 1.5rem !important;
        }
        .px-5 {
            padding-right: 3rem !important;
            padding-left: 3rem !important;
        }
        .py-0 {
            padding-top: 0 !important;
            padding-bottom: 0 !important;
        }
        .py-1 {
            padding-top: 0.25rem !important;
            padding-bottom: 0.25rem !important;
        }
        .py-2 {
            padding-top: 0.5rem !important;
            padding-bottom: 0.5rem !important;
        }
        .py-3 {
            padding-top: 1rem !important;
            padding-bottom: 1rem !important;
        }
        .py-4 {
            padding-top: 1.5rem !important;
            padding-bottom: 1.5rem !important;
        }
        .py-5 {
            padding-top: 3rem !important;
            padding-bottom: 3rem !important;
        }
        .pt-0 {
            padding-top: 0 !important;
        }
        .pt-1 {
            padding-top: 0.25rem !important;
        }
        .pt-2 {
            padding-top: 0.5rem !important;
        }
        .pt-3 {
            padding-top: 1rem !important;
        }
        .pt-4 {
            padding-top: 1.5rem !important;
        }
        .pt-5 {
            padding-top: 3rem !important;
        }
        .pe-0 {
            padding-right: 0 !important;
        }
        .pe-1 {
            padding-right: 0.25rem !important;
        }
        .pe-2 {
            padding-right: 0.5rem !important;
        }
        .pe-3 {
            padding-right: 1rem !important;
        }
        .pe-4 {
            padding-right: 1.5rem !important;
        }
        .pe-5 {
            padding-right: 3rem !important;
        }
        .pb-0 {
            padding-bottom: 0 !important;
        }
        .pb-1 {
            padding-bottom: 0.25rem !important;
        }
        .pb-2 {
            padding-bottom: 0.5rem !important;
        }
        .pb-3 {
            padding-bottom: 1rem !important;
        }
        .pb-4 {
            padding-bottom: 1.5rem !important;
        }
        .pb-5 {
            padding-bottom: 3rem !important;
        }
        .ps-0 {
            padding-left: 0 !important;
        }
        .ps-1 {
            padding-left: 0.25rem !important;
        }
        .ps-2 {
            padding-left: 0.5rem !important;
        }
        .ps-3 {
            padding-left: 1rem !important;
        }
        .ps-4 {
            padding-left: 1.5rem !important;
        }
        .ps-5 {
            padding-left: 3rem !important;
        }
        .rounded {
            border-radius: 0.25rem !important;
        }
        .rounded-0 {
            border-radius: 0 !important;
        }
        .rounded-1 {
            border-radius: 0.2rem !important;
        }
        .rounded-2 {
            border-radius: 0.25rem !important;
        }
        .rounded-3 {
            border-radius: 0.3rem !important;
        }
        .rounded-circle {
            border-radius: 50% !important;
        }
        .rounded-pill {
            border-radius: 50rem !important;
        }
        .rounded-top {
            border-top-left-radius: 0.25rem !important;
            border-top-right-radius: 0.25rem !important;
        }
        .rounded-end {
            border-top-right-radius: 0.25rem !important;
            border-bottom-right-radius: 0.25rem !important;
        }
        .rounded-bottom {
            border-bottom-right-radius: 0.25rem !important;
            border-bottom-left-radius: 0.25rem !important;
        }
        .rounded-start {
            border-bottom-left-radius: 0.25rem !important;
            border-top-left-radius: 0.25rem !important;
        }
        .visible {
            visibility: visible !important;
        }
        .invisible {
            visibility: hidden !important;
        }
        .cursor-alias {cursor: alias;}
        .cursor-all-scroll {cursor: all-scroll;}
        .cursor-auto {cursor: auto;}
        .cursor-cell {cursor: cell;}
        .cursor-context-menu {cursor: context-menu;}
        .cursor-col-resize {cursor: col-resize;}
        .cursor-copy {cursor: copy;}
        .cursor-crosshair {cursor: crosshair;}
        .cursor-default {cursor: default;}
        .cursor-e-resize {cursor: e-resize;}
        .cursor-ew-resize {cursor: ew-resize;}
        .cursor-grab {cursor: -webkit-grab; cursor: grab;}
        .cursor-grabbing {cursor: -webkit-grabbing; cursor: grabbing;}
        .cursor-help {cursor: help;}
        .cursor-move {cursor: move;}
        .cursor-n-resize {cursor: n-resize;}
        .cursor-ne-resize {cursor: ne-resize;}
        .cursor-nesw-resize {cursor: nesw-resize;}
        .cursor-ns-resize {cursor: ns-resize;}
        .cursor-nw-resize {cursor: nw-resize;}
        .cursor-nwse-resize {cursor: nwse-resize;}
        .cursor-no-drop {cursor: no-drop;}
        .cursor-none {cursor: none;}
        .cursor-not-allowed {cursor: not-allowed;}
        .cursor-pointer {cursor: pointer;}
        .cursor-progress {cursor: progress;}
        .cursor-row-resize {cursor: row-resize;}
        .cursor-s-resize {cursor: s-resize;}
        .cursor-se-resize {cursor: se-resize;}
        .cursor-sw-resize {cursor: sw-resize;}
        .cursor-text {cursor: text;}
        .cursor-w-resize {cursor: w-resize;}
        .cursor-wait {cursor: wait;}
        .cursor-zoom-in {cursor: zoom-in;}
        .cursor-zoom-out {cursor: zoom-out;}
    </style>`;

    $('head').append(style);
})();