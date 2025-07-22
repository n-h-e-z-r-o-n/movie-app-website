
    function scrambleToText(el, finalText, speed = 40) {
      const chars = '!<>-_\\/[]{}—=+*^?#________'
      const queue = []
      const length = finalText.length

      for (let i = 0; i < length; i++) {
        queue.push({
          to: finalText[i],
          char: '',
          done: false,
          frame: 0,
          maxFrames: Math.floor(Math.random() * speed+ speed)
        })
      }

      function randomChar() {
        return chars[Math.floor(Math.random() * chars.length)]
      }

      function update() {
        let output = ''
        let complete = 0

        for (let i = 0; i < length; i++) {
          const q = queue[i]
          if (q.done) {
            output += q.to
            complete++
          } else {
            if (q.frame >= q.maxFrames) {
              q.done = true
              output += q.to
            } else {
              if (q.frame === 0 || Math.random() < 0.5) {
                q.char = randomChar()
              }
              output += `<span class="dud">${q.char}</span>`
              q.frame++
            }
          }
        }

        el.innerHTML = output

        if (complete < length) {
          requestAnimationFrame(update)
        }
      }

      update()
    }

    // Usage
    const el = document.querySelector('.text')
    scrambleToText(el, "Hello World!", 40)