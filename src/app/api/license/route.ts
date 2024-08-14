import { NextResponse, type NextRequest } from "next/server";
import { createClient } from '@supabase/supabase-js'

export const POST = async (req: NextRequest) => {



    const { purchaseCode } = await req.json();

    // 确保 purchaseCode 不为空
    if (!purchaseCode) {
        return NextResponse.json({ message: 'Purchase code is required' }, { status: 400 });
    }

    const supabase = createClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.SUPABASE_SERVICE_KEY!
    );

    try {
        // 查询注册码
        const { data, error } = await supabase
            .from('licenses')
            .select('*')
            .eq('code', purchaseCode)
            .single();



        if (error) {
            console.error('Error querying database:', error);
            return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
        }

        if (!data) {
            return NextResponse.json({ message: 'Invalid purchase code' }, { status: 400 });
        }

        // 检查是否已被使用
        // if (data.is_used === 1) {
        //     return NextResponse.json({ message: 'Purchase code has already been used' }, { status: 400 });
        // }

        console.log('data', data);
        // 标记为已使用
        const { error: updateError } = await supabase
            .from('licenses')
            .update({ is_used: data.is_used + 1 })
            .eq('id', data.id);

        if (updateError) {
            console.error('Error updating license:', updateError);
            return NextResponse.json({ message: 'Error activating license' }, { status: 500 });
        }

        return NextResponse.json({ message: 'License activated', });

    } catch (error) {
        console.error('Error checking purchase code:', error);
        return NextResponse.json({ message: 'Internal server error' }, { status: 500 });
    }
};
