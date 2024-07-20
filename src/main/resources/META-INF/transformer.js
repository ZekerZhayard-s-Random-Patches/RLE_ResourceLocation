
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "ResourceLocation_<init>": {
            "target": {
                "type": "METHOD",
                "class": "net/minecraft/resources/ResourceLocation",
                "methodName": "<init>",
                "methodDesc": "([Ljava/lang/String;)V"
            },
            "transformer": function (mn) {
                var insnList = mn.instructions.toArray();
                for (var i = 0; i < insnList.length; i++) {
                    var node = insnList[i];
                    if (node.getOpcode() === Opcodes.ATHROW) {
                        mn.instructions.set(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/rle_resourcelocation/RLE_ResourceLocation", "fixValidName", "(Ljava/lang/Throwable;)V", false));
                    }
                }
                return mn;
            }
        }
    }
}
