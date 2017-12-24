<guidance>
    <div id="guidance" if={gidance}>
        <div class="ui attached message {gidance.type}">
            <i class="close icon" onclick={ close }></i>
            <div class="header">{gidance.text}</div>
        </div>
    </div>
    <style>
        #guidance {
            width: 100%;
            position: fixed;
            z-index: 100;
            opacity: 0.9;
        }
    </style>

    <script>
        var that = this
        that.gidance = null
        close(ms=0) {
            setTimeout(function() {
                $('#guidance').transition('scale')
                that.gidance = null
            }, ms)
        }

        obs.on("guidanceChanged", function(obj) {
            that.update()
            that.gidance = obj
            that.update()
            that.close(3000)
        })
    </script>
</guidance>