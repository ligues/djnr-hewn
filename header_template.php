<?php

if(is_page('services')){
    $services_class = "active";
}


?>


<div class="logo black uppercase"><a href="#">HEWN</a></div>
<div class="dotted">
    <nav class="content_dotted">
        <a href="#" class="bold uppercase <?php echo $services_class; ?>">Services</a>
        <a href="#" class="bold uppercase">Projects</a><br/>
        <a href="#" class="bold uppercase">About</a>
        <a href="#" class="bold uppercase">Store</a>
    </nav>
    <div class="address">
        <span>+1 512_386_6404</span>
        <a href="mailto:info@hewnaustin.com">info@hewnaustin.com</a>
    </div>
</div>