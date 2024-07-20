package io.github.zekerzhayard.rle_resourcelocation;

import net.minecraftforge.fml.common.Mod;

@Mod("rle_resourcelocation")
public class RLE_ResourceLocation {
    public static void fixValidName(Throwable t) throws Throwable {
        if (t.getMessage() != null && t.getMessage().endsWith(":DUMMY")) {
            throw t;
        }
    }
}
