(function () {
    var resources = glinamespace("gli.capture.data.resources");
    
    var Renderbuffer = function Renderbuffer(resourceCache, rawArgs, target, stack) {
        glisubclass(resources.Resource, this, [resourceCache, rawArgs, target, stack, "Renderbuffer"]);
    };
    
    Renderbuffer.getTracked = function getTracked(gl, args) {
        // only RENDERBUFFER
        var bindingEnum = gl.RENDERBUFFER_BINDING;
        var target = gl.getParameter(bindingEnum);
        if (target) {
            return target.tracked;
        } else {
            return null;
        }
    };
    
    Renderbuffer.setupCaptures = function setupCaptures(impl) {
        var methods = impl.methods;
        var buildRecorder = resources.Resource.buildRecorder;
        
        var resetCalls = [
            "renderbufferStorage"
        ];
        
        buildRecorder(impl, "renderbufferStorage", Renderbuffer.getTracked, resetCalls);
    };
    
    resources.Renderbuffer = Renderbuffer;
    
})();
