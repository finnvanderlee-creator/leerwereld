"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
const V = "leerwereld-v7";
const CDN = "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2";
const FILES = ["./", "./index.html", "./manifest.webmanifest", "./icon-192.png", "./icon-512.png", "./icon-maskable-512.png", "./apple-touch-icon.png"];
self.addEventListener("install", e => { e.waitUntil((() => __awaiter(void 0, void 0, void 0, function* () { const c = yield caches.open(V); yield c.addAll(FILES); try {
    yield c.add(new Request(CDN, { mode: "no-cors" }));
}
catch (_) { } self.skipWaiting(); }))()); });
self.addEventListener("activate", e => { e.waitUntil((() => __awaiter(void 0, void 0, void 0, function* () { for (const k of yield caches.keys())
    if (k !== V)
        yield caches.delete(k); yield self.clients.claim(); }))()); });
self.addEventListener("fetch", e => {
    const r = e.request;
    if (r.method !== "GET")
        return;
    const u = new URL(r.url);
    if (u.hostname.endsWith("supabase.co"))
        return;
    if (r.mode === "navigate") {
        e.respondWith(fetch(r).then(res => { const cp = res.clone(); caches.open(V).then(c => c.put("./index.html", cp)); return res; }).catch(() => caches.match("./index.html")));
        return;
    }
    e.respondWith(caches.match(r).then(m => m || fetch(r).then(res => {
        if (u.origin === location.origin || u.href === CDN) {
            const cp = res.clone();
            caches.open(V).then(c => c.put(r, cp));
        }
        return res;
    })));
});
