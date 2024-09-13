
var Opcodes = Java.type("org.objectweb.asm.Opcodes");
var MethodInsnNode = Java.type("org.objectweb.asm.tree.MethodInsnNode");

function initializeCoreMod() {
    return {
        "ResourceLocation": {
            "target": {
                "type": "CLASS",
                "name": "net/minecraft/resources/ResourceLocation"
            },
            "transformer": function (cn) {
                for (var mnItr = cn.methods.iterator(); mnItr.hasNext();) {
                    var mn = mnItr.next();
                    var insnList = mn.instructions.toArray();
                    var found = false;
                    for (var i = 0; i < insnList.length; i++) {
                        var node = insnList[i];
                        if (node.getOpcode() === Opcodes.NEW && node.desc.equals("net/minecraft/ResourceLocationException")) {
                            found = true;
                        }
                        if (found && node.getOpcode() === Opcodes.ATHROW) {
                            mn.instructions.set(node, new MethodInsnNode(Opcodes.INVOKESTATIC, "io/github/zekerzhayard/rle_resourcelocation/RLE_ResourceLocation", "fixValidName", "(Ljava/lang/Throwable;)V", false));
                            found = false;
                        }
                    }
                }
                return cn;
            }
        }
    }
}
