const listener = Deno.listen({ port: 8080 });
console.log("HTTP webserver running. Access it at: http://localhost:8080/");

for await (const conn of listener) {
  handle(conn);
}

async function handle(conn) {
  for await (const { request, respondWith } of Deno.serveHttp(conn)) {
    if (request.url.endsWith("/")) {
      const body = await Deno.readFile("index.html");
      respondWith(new Response(body, { status: 200 }));
    } else {
      const filePath = request.url.split("/").pop();
      try {
        const body = await Deno.readFile(filePath);
        respondWith(new Response(body, { status: 200 }));
      } catch {
        respondWith(new Response("File not found", { status: 404 }));
      }
    }
  }
}